import {
  adminCheckMiddleware,
  isEitherUserOrAdminMiddleware,
} from "./authRoutes";
import express, { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { OrderFormSchema } from "../models/Order";
import z from "zod";
import { ProductService } from "../services/ProductService";
import { ProductInterface } from "../models/Product";

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
  .post(async (req: Request, res: Response) => {
    await POST(req, res);
  });

router.get("/totalrevenue", adminCheckMiddleware, async (req: Request, res: Response) => {
  try {
    const data = await orderService.getTotalRevenue();
    return res.json(data);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
});

router.get("/newest/:number", adminCheckMiddleware, async (req: Request, res: Response) => {
  try {
    const { num } = req.params;
    const data = await orderService.getLatestNOrders(Number(num));
    return res.json(data);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
});

router.get("/monthrevenue", adminCheckMiddleware, async (req: Request, res: Response) => {
  try {
    const data = await orderService.getTotalRevenueLastMonth();
    return res.json(data);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
});

router.get("/incomplete", adminCheckMiddleware, async (req: Request, res: Response) => {
  try {
    const data = await orderService.getIncompleteOrders();
    return res.json(data);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
});
router.get("/complete", adminCheckMiddleware, async (req: Request, res: Response) => {
  try {
    const data = await orderService.getCompleteOrders();
    return res.json(data);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
});

router.get("/user/:email", isEitherUserOrAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const data = await orderService.getOrdersOf(email);
    return res.json(data);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
});

router.get("/:id/products", adminCheckMiddleware, async (req: Request, res: Response) => {
  try {
    const productService = new ProductService();
    const { _id } = req.params;

    const data = await orderService.getSingleOrder(_id);
    const result = [] as ProductInterface[];
    data?.productIDs?.forEach(async (id) => {
      const product = await productService.getSingleProduct(id);
      if (product) result.push(product);
    });
    return res.json(result);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
});

router
  .route("/:_id")
  .get(adminCheckMiddleware, async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const data = await orderService.getSingleOrder(_id);
      return res.json(data);
    } catch (err) {
      return res.status(500).send("Server error: " + err);
    }
  })
  .patch(isEitherUserOrAdminMiddleware, async (req: Request, res: Response) => {
    await PATCH(req, res);
  })
  .put(isEitherUserOrAdminMiddleware, async (req: Request, res: Response) => {
    await PUT(req, res);
  })
  .delete(adminCheckMiddleware, async (req: Request, res: Response) => {
    await DELETE(req, res);
  });

export default router;

async function POST(req: Request, res: Response) {
  try {
    const order = OrderFormSchema.parse(req.body);
    const data = await orderService.createOrder(order);
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

async function GET(req: Request, res: Response) {
  try {
    const data = await orderService.getAllOrders();
    return res.json(data);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
}

async function PUT(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const data = OrderFormSchema.parse(req.body);
    const result = await orderService.updateOrder({ ...data, _id });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error: " + err);
  }
}

async function PATCH(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const { email, ...rest } = OrderPatchSchema.parse(req.body);
    Object.keys(rest).forEach((key) => {
      if (rest[key as keyof typeof rest] === undefined) {
        delete rest[key as keyof typeof rest];
      }
    });
    const result = await orderService.patchOrder(_id, rest);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error: " + err);
  }
}

async function DELETE(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const data = await orderService.deleteOrder(_id);
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error: " + err);
  }
}
