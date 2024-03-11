import type { NextApiRequest, NextApiResponse } from "next";
import {
  Product,
  type ProductInterface,
  type ProductModel,
} from "~/models/Product";
import { mongooseConnect } from "~/lib/mongoose";
import axios from "axios";
import { isAdminRequest } from "~/server/auth";

import { z } from "zod";
import { ProductService } from "~/services/ProductService";

const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  size: z.string(),
  status: z.string(),
  _id: z.string(),
  images: z.array(z.string()),
});

const productService = new ProductService();

export type Product = z.infer<typeof ProductSchema>;

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
    const input = ProductSchema.parse(req.body);
    const data = await productService.createProduct(input);
    res.json(data);
  }
  if (req.method === "GET") {
    if (req.query?.id) {
      const data = productService.getProduct(req.query.id);
      res.json(data);
    } else {
      const data = productService.getAllProducts();
      res.json(data);
    }
  }
  if (req.method === "PUT") {
    await isAdminRequest(req, res);
    const input = ProductSchema.parse(req.body);
    const data = await productService.updateProduct(input);
    res.json(data);
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
