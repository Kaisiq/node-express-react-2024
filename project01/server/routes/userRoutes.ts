import { adminOrStaffCheckMiddleware, userOrGreaterCheckMiddleware } from "./authRoutes.ts";
import express, { type Request, type Response } from "express";
import { UserCreationFormSchema } from "../models/User.ts";
import { UserService } from "../services/UserService.ts";
import bcrypt from "bcrypt";

const userService = new UserService();
const router = express.Router();

router
  .route("/")
  .get(adminOrStaffCheckMiddleware, async (req: Request, res: Response) => {
    try {
      const data = await userService.getAllUsers();
      return res.json(data);
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const user = UserCreationFormSchema.parse(req.body);
      if (user.password) {
        const hashedPass = await bcrypt.hash(
          user.password,
          Number(process.env.NEXTAUTH_HASHLEVELS)
        );
        const created = await userService.createUser({ ...user, hashedPassword: hashedPass });
        return res.json(created);
      } else {
        const created = await userService.createUser(user);
        return res.json(created);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error: " + err);
    }
  });

router.get("/total", adminOrStaffCheckMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserCount();
    return res.json(result);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
});

router
  .route("/:email")
  .patch(userOrGreaterCheckMiddleware, async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const input: object = req.body as object;
      const result = await userService.patchUser(email, input);
      return res.json(result);
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  })
  .get(userOrGreaterCheckMiddleware, async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const data = await userService.getUser(email);
      return res.json(data);
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  })
  .put(userOrGreaterCheckMiddleware, async (req: Request, res: Response) => {
    try {
      const data = UserCreationFormSchema.parse(req.body);
      if (data.password) {
        const hashedPass = await bcrypt.hash(
          data.password,
          Number(process.env.NEXTAUTH_HASHLEVELS)
        );
        const created = await userService.updateUser({ ...data, hashedPassword: hashedPass });
        return res.json(created);
      } else {
        const result = await userService.updateUser(data);
        return res.json(result);
      }
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  })
  .delete(adminOrStaffCheckMiddleware, async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
      const deleted = await userService.deleteUser(email);
      return res.json(deleted);
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  });

export default router;
