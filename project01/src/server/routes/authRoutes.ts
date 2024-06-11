import { UserInterface } from "~/models/User";
import { UserService } from "../services/UserService";
import * as bcrypt from "bcrypt";
// import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// import express from "express";
// import { strategy } from "../config/passport";
import express, { Request, Response } from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/password", (req: Request, res: Response, next) => {
  passport.authenticate(
    "local",
    (err: Error, user: UserInterface | undefined, info: { message: string }) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      if (!user) {
        return res.status(400).send(info.message);
      }
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || "your_jwt_secret",
        {
          expiresIn: "1h", // Token expiry time
        }
      );
      return res.status(200).json({ user, token });
    }
  )(req, res, next);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Profile access granted.", user: req.user });
  }
);

export default router;

export async function isAdminRequest(req: Request, res: Response) {
  const us = new UserService();
  const user = await us.getSingleUser("mazna");
  return user?.admin;
}

export async function isUserRequest(req: Request, res: Response) {
  return true;
}

export async function loginWithPass(req: Request, res: Response) {
  interface RB {
    email: string;
    password: string;
  }
  const { email, password }: RB = req.body as RB;
  const userService = new UserService();
  const user = await userService.getSingleUser(email);
  if (!user || !user.hashedPassword) {
    res.status(401).send("user doesnt exist");
  } else {
    const validPass = await bcrypt.compare(password, user.hashedPassword);
    if (!validPass) res.status(400);
    else res.status(404);
  }

  res.json(user);
}
