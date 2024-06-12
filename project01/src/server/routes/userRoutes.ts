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
  const { email } = req.params;
  try {
    const input: object = req.body as object;
    const isAdmin = await isAdminCheck(req, res);
    const isUser = await isUserRequest(req, res);
    if (!isAdmin && !isUser) res.status(401).send("Cannot do that operation. Please log in");
    const result = await userService.patchUser(email, input);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: "Failed to do that operation." });
  }
});

export default router;

async function GET(req: Request, res: Response) {
  try {
    const isAdmin = await isAdminCheck(req, res);
    const isUser = await isUserRequest(req, res);
    if (!isAdmin && !isUser) res.status(401).send("Cannot do that operation. Please log in");
    if (req?.query?.email) {
      const data = await userService.getUser(req.query.email as string | string[]);
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Failed to do that operation." });
  }
}
async function PUT(req: Request, res: Response) {
  const data = UserFromSchema.parse(req.body);
  const result = await userService.updateUser(data);
  res.json(result);
}
