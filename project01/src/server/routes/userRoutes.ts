import { adminCheckMiddleware, isEitherUserOrAdminMiddleware } from "./authRoutes";
import express, { Request, Response } from "express";
import { UserFromSchema } from "../models/User";
import { UserService } from "../services/UserService";

const userService = new UserService();
const router = express.Router();

router.route("/").get(adminCheckMiddleware, async (req: Request, res: Response) => {
  try {
    const data = await userService.getAllUsers();
    return res.json(data);
  } catch (err) {
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
      const data = UserFromSchema.parse(req.body);
      const result = await userService.updateUser(data);
      return res.json(result);
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  });

export default router;
