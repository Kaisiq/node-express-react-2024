import type { NextApiRequest, NextApiResponse } from "next";
import {
  Product,
  type ProductInterface,
  type ProductModel,
} from "~/models/Product";
import { mongooseConnect } from "~/lib/mongoose";
import axios from "axios";
import { isAdminRequest } from "~/server/auth";

interface RequestBody {
  name: string;
  description: string;
  size: string;
  price: number;
  category: string;
  status: string;
  images: string[];
  _id: string;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  function linksToFileKeys(links: string[] | undefined) {
    if (!links) return "";
    const fileKeys: string[] = [];
    links.forEach((link) => {
      if (link) {
        const splittedLink = link.split("/");

        const fk: string | undefined = splittedLink ? splittedLink.at(-1) : "";
        if (!!fk) {
          fileKeys.push(fk);
        }
      }
    });
    return fileKeys;
  }

  await mongooseConnect();

  if (req.method === "POST") {
    interface RB {
      ids: string[];
      // Add other properties if needed
    }

    const reqBody: RB = req.body as RB;
    const { ids }: RB = reqBody;
    if (ids) {
      const data: ProductInterface[] = await (Product as ProductModel).find({
        _id: ids,
      });
      res.json(data);
      return;
    }

    await isAdminRequest(req, res);
    const requestBody: RequestBody = req.body as RequestBody;
    const {
      name,
      description,
      size,
      price,
      category,
      status,
      images,
    }: RequestBody = requestBody;
    const data = await (Product as ProductModel).create({
      name,
      description,
      price,
      category,
      size,
      status,
      images,
    });
    res.json(data);
  }
  if (req.method === "GET") {
    if (req.query?.id) {
      const data = await (Product as ProductModel).findOne({
        _id: req.query.id,
      });
      res.json(data);
    } else {
      const data = await (Product as ProductModel).find().limit(50);
      res.json(data);
    }
  }
  if (req.method === "PUT") {
    await isAdminRequest(req, res);
    const requestBody: RequestBody = req.body as RequestBody;
    const {
      name,
      description,
      size,
      price,
      category,
      status,
      images,
      _id,
    }: RequestBody = requestBody;
    await Product.updateOne(
      { _id: _id },
      { name, description, size, price, category, status, images },
    );
    res.json(true);
  }
  if (req.method === "DELETE") {
    await isAdminRequest(req, res);
    if (req.query?.id) {
      const data = await (Product as ProductModel).findOne({
        _id: req.query.id,
      });
      if (!data) {
        return;
      }
      const links = data.images;
      const fileKeys = linksToFileKeys(links);
      const bearer = process.env.UPLOADTHING_SECRET;
      const options = {
        method: "POST",
        url: "https://uploadthing.com/api/deleteFile",
        headers: {
          "Content-Type": "application/json",
          "X-Uploadthing-Api-Key": bearer,
        },
        data: { fileKeys: fileKeys },
      };
      try {
        await axios.request(options);
        await (Product as ProductModel).deleteOne({ _id: req.query.id });
        res.json(true);
      } catch (error) {
        console.error(error);
        res.json(error);
      }
    }
  }
}
