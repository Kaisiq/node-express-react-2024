import type { NextApiRequest, NextApiResponse } from "next";
import { Order, OrderModel, OrderInterface } from "~/models/Order";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const requestBody: OrderInterface = req.body as OrderInterface;
    const {
      flname,
      tel,
      email,
      address,
      info,
      city,
      price,
      status,
    }: OrderInterface = requestBody;
    const data = await (Order as OrderModel).create({
      flname,
      tel,
      email,
      address,
      info,
      city,
      price,
      status,
    });
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
