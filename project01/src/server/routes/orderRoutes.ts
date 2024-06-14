import { isAdminCheck, isUserRequest } from "./authRoutes";
import express, { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { OrderFormSchema } from "../models/Order";
import z from "zod";

const OrderPatchSchema = z.object({
  flname: z.string().optional(),
  tel: z.string().optional(),
  address: z.string().optional(),
  info: z.string().optional(),
  city: z.string().optional(),
  email: z.string(),
  price: z.number().optional(),
  status: z.string().optional(),
  productIDs: z.array(z.string()).optional(),
  productNames: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
});

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

router.patch("/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { email, ...rest } = OrderPatchSchema.parse(req.body);
  Object.keys(rest).forEach((key) => {
    if (rest[key as keyof typeof rest] === undefined) {
      delete rest[key as keyof typeof rest];
    }
  });
  const isAdmin = await isAdminCheck(req, res);
  const isUser = await isUserRequest(req, res);
  if (isUser.user?.email != email) {
    res.status(401).send("Unauthorized. Please change account if you want to edit this.");
    return;
  }
  if (!isAdmin && !isUser) {
    return res.status(401).send("Unauthorized. Please log in");
  }
  if (isUser.newToken) {
    res.setHeader("Authorization", `Bearer ${isUser.newToken}`);
  }
  const result = await orderService.patchOrder(_id, rest);
  return res.json(result);
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
    if (!isAdmin) {
      res.status(401).send("Unauthorized");
    }
    const data = await orderService.getOrder(req.query.id as string | string[]);
    res.json(data);
  } else if (req?.query?.email) {
    try {
      const isUser = await isUserRequest(req, res);
      if (!isUser || isUser.user?.email != req.query.email) {
        return res.status(401).send("not authenticated user");
      }
      if (isUser.newToken) {
        res.setHeader("Authorization", `Bearer ${isUser.newToken}`);
      }
      const data = await orderService.getOrdersOf(req.query.email as string);
      return res.json(data);
    } catch (err) {
      return res.status(401).send("not authenticated user");
    }
  } else if (req?.query?.newest) {
    const isAdmin = await isAdminCheck(req, res);
    if (!isAdmin) {
      res.status(401).send("Unauthorized");
    }
    const data = await orderService.getLatestNOrders(req.query.newest as unknown as number);
    res.json(data);
  } else {
    const isAdmin = await isAdminCheck(req, res);
    if (!isAdmin) {
      res.status(401).send("Unauthorized");
    }
    const data = await orderService.getAllOrders();
    res.json(data);
  }
}

async function PUT(req: Request, res: Response) {
  try {
    const data = OrderFormSchema.parse(req.body);
    const isAdmin = await isAdminCheck(req, res);
    const isUser = await isUserRequest(req, res);
    if (!isAdmin || !isUser) {
      res.status(401).send("Unauthorized. Please log in");
      return;
    }
    if (isUser.newToken) {
      res.setHeader("Authorization", `Bearer ${isUser.newToken}`);
    }
    const result = await orderService.updateOrder(data);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
}

async function DELETE(req: Request, res: Response) {
  try {
    const isUser = await isUserRequest(req, res);
    const isAdmin = await isAdminCheck(req, res);
    if (isUser?.newToken) {
      res.setHeader("Authorization", `Bearer ${isUser.newToken}`);
    }
    if (!isAdmin) {
      return res.status(401).send("Unauthorized");
    }
    if (req.query?.id) {
      const data = await orderService.deleteOrder(req.query.id as string);
      return res.json(data);
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
}
