import type { NextApiRequest, NextApiResponse } from "next";
import { Order, OrderModel, OrderInterface } from "~/models/Order";
import { z } from "zod";

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
});

export type FormSchemaType = z.infer<typeof FormSchema>;

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
      const data = await (Order as OrderModel).find().limit(50);
      res.json(data);
    }
  }
}
