import { adminCheckMiddleware, isEitherUserOrAdminMiddleware } from "./authRoutes";
import express, { Request, Response } from "express";
import { UserCreationFormSchema, UserFromSchema } from "../models/User";
import { UserService } from "../services/UserService";
import bcrypt from "bcrypt";

const userService = new UserService();
const router = express.Router();

router
  .route("/")
  .get(adminCheckMiddleware, async (req: Request, res: Response) => {
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

router.get("/total", adminCheckMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserCount();
    return res.json(result);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
});

router
  .route("/:email")
  .patch(isEitherUserOrAdminMiddleware, async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const input: object = req.body as object;
      const result = await userService.patchUser(email, input);
      return res.json(result);
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  })
  .get(isEitherUserOrAdminMiddleware, async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const data = await userService.getUser(email);
      return res.json(data);
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  })
  .put(isEitherUserOrAdminMiddleware, async (req: Request, res: Response) => {
    try {
      const data = UserCreationFormSchema.parse(req.body);
      if (data.password) {
        const hashedPass = await bcrypt.hash(
          data.password,
          Number(process.env.NEXTAUTH_HASHLEVELS)
        );
        const created = await userService.createUser({ ...data, hashedPassword: hashedPass });
        return res.json(created);
      } else {
        const result = await userService.updateUser(data);
        return res.json(result);
      }
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  });

export default router;
