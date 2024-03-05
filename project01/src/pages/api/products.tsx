import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "~/models/Product";
import { mongooseConnect } from "~/lib/mongoose";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await mongooseConnect();

  if (req.method === "POST") {
    const { name, description, size, price, category, status } = req.body;
    const data = await Product.create({
      name,
      description,
      price,
      category,
      size,
      status,
    });
    res.json(data);
  }
  if (req.method === "GET") {
    if (req.query?.id) {
      const data = await Product.findOne({ _id: req.query.id });
      res.json(data);
    } else {
      const data = await Product.find();
      res.json(data);
    }
  }
  if (req.method === "PUT") {
    const { name, description, size, price, category, status, _id } = req.body;
    await Product.updateOne(
      { _id: _id },
      { name, description, size, price, category, status },
    );
    res.json(true);
  }
  if (req.method === "DELETE") {
    await Product.deleteOne({ _id: req.query.id });
    res.json(true);
  }
}
