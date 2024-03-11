import type { NextApiRequest, NextApiResponse } from "next";
import { Order, type OrderModel } from "~/models/Order";
import { z } from "zod";
import { OrderService } from "~/services/OrderService";

const FormSchema = z.object({
  flname: z.string().min(2, {
    message: "Моля не оставяйте полето празно",
  }),
  tel: z
    .string()
    .min(10, {
      message: "Моля напишете валиден телефонен номер",
    })
    .max(13, {
      message: "Моля напишете валиден телефонен номер",
    }),
  address: z.string().min(2, {
    message: "Моля въведете адрес",
  }),
  info: z.string(),
  city: z.string().min(1, {
    message: "Моля въведете валиден град",
  }),
  email: z.string(),
  price: z.string(),
  status: z.string(),
  productIDs: z.array(z.string()),
  productNames: z.array(z.string()),
  _id: z.string(),
  createdAt: z.date(),
});

export type OrderInterface = z.infer<typeof FormSchema>;

const orderService = new OrderService();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const order = FormSchema.parse(req.body);
    const data = await (Order as OrderModel).create(order);
    res.json(data);
  }
  if (req.method === "GET") {
    if (req?.query?.id) {
      const data = await (Order as OrderModel).findById(req.query.id);
      res.json(data);
    } else {
      const data = await (Order as OrderModel)
        .find()
        .sort({ createdAt: -1 })
        .limit(50);
      res.json(data);
    }
  }
  if (req.method === "PUT") {
    const data = FormSchema.parse(req.body);
  }
}
