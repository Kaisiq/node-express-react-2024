import { isAdminCheck, isUserRequest } from "./authRoutes";
import express, { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { OrderFormSchema } from "../models/Order";

const orderService = new OrderService();
const router = express.Router();

router
  .route("/")
  .get(async (req: Request, res: Response) => {
    await GET(req, res);
  })
  .put(async (req: Request, res: Response) => {
    await PUT(req, res);
  })
  .post(async (req: Request, res: Response) => {
    await POST(req, res);
  })
  .delete(async (req: Request, res: Response) => {
    await DELETE(req, res);
  });

export default router;

async function POST(req: Request, res: Response) {
  const order = OrderFormSchema.parse(req.body);
  const data = await orderService.createOrder(order);
  res.json(data);
}

async function GET(req: Request, res: Response) {
  if (req?.query?.id) {
    const isAdmin = await isAdminCheck(req, res);
    if (!isAdmin) throw "not admin";
    const data = await orderService.getOrder(req.query.id as string | string[]);
    res.json(data);
  } else if (req?.query?.email) {
    try {
      const isUser = await isUserRequest(req, res);
      if (!isUser) throw "not authenticated user";
      const data = await orderService.getOrdersOf(req.query.email as string);
      res.json(data);
    } catch (err) {
      throw "not authenticated user";
    }
  } else if (req?.query?.newest) {
    const isAdmin = await isAdminCheck(req, res);
    if (!isAdmin) throw "not admin";
    const data = await orderService.getLatestNOrders(req.query.newest as unknown as number);
    res.json(data);
  } else {
    const isAdmin = await isAdminCheck(req, res);
    if (!isAdmin) throw "not admin";
    const data = await orderService.getAllOrders();
    res.json(data);
  }
}

async function PUT(req: Request, res: Response) {
  const data = OrderFormSchema.parse(req.body);
  const isAdmin = await isAdminCheck(req, res);
  const isUser = await isUserRequest(req, res);
  if (!isAdmin || !isUser) throw "Cannot do that operation. Please log in";
  const result = await orderService.updateOrder(data);
  res.json(result);
}

async function DELETE(req: Request, res: Response) {
  const isAdmin = await isAdminCheck(req, res);
  if (!isAdmin) throw "not admin";
  if (req.query?.id) {
    const data = await orderService.deleteOrder(req.query.id as string);
    res.json(data);
  }
}
