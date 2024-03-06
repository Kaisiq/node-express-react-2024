import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "~/models/Product";
import { mongooseConnect } from "~/lib/mongoose";
import axios from "axios";
import { isAdminRequest } from "~/server/auth";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await isAdminRequest(req, res);

  function linksToFileKeys(links: (string | undefined)[]) {
    const fileKeys: string[] = [];
    links.forEach((link) => {
      if (link) {
        const splittedLink = link.split("/");

        const fk: string | undefined = splittedLink ? splittedLink.at(-1) : "";
        fileKeys.push(fk as string);
      }
    });
    return fileKeys;
  }

  await mongooseConnect();

  if (req.method === "POST") {
    const { name, description, size, price, category, status, images } =
      req.body;
    const data = await Product.create({
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
      const data = await Product.findOne({ _id: req.query.id });
      res.json(data);
    } else {
      const data = await Product.find();
      res.json(data);
    }
  }
  if (req.method === "PUT") {
    const { name, description, size, price, category, status, images, _id } =
      req.body;
    await Product.updateOne(
      { _id: _id },
      { name, description, size, price, category, status, images },
    );
    res.json(true);
  }
  if (req.method === "DELETE") {
    if (req.query?.id) {
      const data = await Product.findOne({ _id: req.query.id });
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
        const { data } = await axios.request(options);
        console.log(data);
        await Product.deleteOne({ _id: req.query.id });
        res.json(true);
      } catch (error) {
        console.error(error);
        res.json(error);
      }
    }
  }
}
