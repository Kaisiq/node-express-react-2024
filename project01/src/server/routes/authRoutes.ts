import { UserInterface } from "~/models/User";
import { UserService } from "../services/UserService";
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

export async function isAdminRequest(req: Request, res: Response): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    passport.authenticate("jwt", { session: false }, async (err: Error, user: UserInterface) => {
      if (err || !user) {
        console.log(err, user);
        console.log("An error occurred while checking admin status or user not found.");
        resolve(false);
      } else {
        try {
          const userService = new UserService();
          const fetchedUser = await userService.getSingleUser(user.email);
          if (fetchedUser && fetchedUser.admin) {
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          console.log("An error occurred while checking admin status.");
          resolve(false);
        }
      }
    })(req, res);
  });
}

export async function isUserRequest(req: Request, res: Response) {
  passport.authenticate("jwt", { session: false }),
    async (err: Error, user: UserInterface) => {
      console.log(user);
      if (err) res.status(401).json(err);
      res.status(200).json(user);
    };
  return true;
}
