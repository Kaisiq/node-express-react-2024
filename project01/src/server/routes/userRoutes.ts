import { isAdminCheck, isUserRequest } from "./authRoutes";
import express, { Request, Response } from "express";
import { UserFromSchema } from "../models/User";
import { UserService } from "../services/UserService";

const userService = new UserService();
const router = express.Router();

router
  .route("/")
  .get(async (req: Request, res: Response) => {
    await GET(req, res);
  })
  .put(async (req: Request, res: Response) => {
    await PUT(req, res);
  });
// .post(async (req: Request, res: Response) => {
//   await POST(req, res);
// })
// .delete(async (req: Request, res: Response) => {
//   await DELETE(req, res);
// });

router.patch("/:email", async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const input: object = req.body as object;
    const isAdmin = await isAdminCheck(req, res);
    const isUser = await isUserRequest(req, res);
    if (!isAdmin && !isUser) return res.status(401).send("Cannot do that operation. Please log in");
    if (isUser?.newToken) {
      res.setHeader("Authorization", `Bearer ${isUser.newToken}`);
    }
    if (isUser.user?.email != email && !isAdmin)
      return res.status(401).send("Unauthorized. Log in to this account to edit it.");
    const result = await userService.patchUser(email, input);
    return res.json(result);
  } catch (error) {
    return res.status(401).json({ error: "Failed to do that operation." });
  }
});

router.get("/total", async (req: Request, res: Response) => {
  try {
    const isAdmin = await isAdminCheck(req, res);
    if (!isAdmin) {
      return res.status(401);
    }
    const result = await userService.getUserCount();
    return res.json(result);
  } catch (err) {
    return res.status(401);
  }
});

export default router;

async function GET(req: Request, res: Response) {
  try {
    const isAdmin = await isAdminCheck(req, res);
    const isUser = await isUserRequest(req, res);

    if (!isAdmin && !isUser) return res.status(401).send("Cannot do that operation. Please log in");
    if (isUser?.newToken) {
      res.setHeader("Authorization", `Bearer ${isUser.newToken}`);
    }
    if (req?.query?.email) {
      if (req.query.email != isUser?.user?.email && !isAdmin) {
        return res.status(401).send("Unauthorized. You can get info only about yourself");
      }
      const data = await userService.getUser(req.query.email as string | string[]);
      return res.json(data);
    } else {
      const data = await userService.getAllUsers();
      return res.json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Failed to do that operation." });
  }
}
async function PUT(req: Request, res: Response) {
  try {
    const isAdmin = await isAdminCheck(req, res);
    const isUser = await isUserRequest(req, res);

    if (!isAdmin && !isUser) return res.status(401).send("Cannot do that operation. Please log in");
    if (isUser?.newToken) {
      res.setHeader("Authorization", `Bearer ${isUser.newToken}`);
    }
    const data = UserFromSchema.parse(req.body);
    if (isUser?.user?.email != data.email && !isAdmin) {
      return res.status(401).send("Unauthorized. You can edit only your profile");
    }
    const result = await userService.updateUser(data);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(401);
  }
}
