import {
  Product,
  type ProductModel,
  ProductValidateSchema,
  ProductInterface,
} from "./models/Product";
import { isAdminRequest } from "./auth";
import { Request, Response } from "express";
import { ProductService } from "./services/ProductService";
import { DatabaseZap } from "lucide-react";

const productService = new ProductService();

export async function POST(req: Request, res: Response) {
  interface RB {
    ids: string[];
  }

  const { ids }: RB = req.body as RB;
  // const { ids }: RB = reqBody;
  if (ids) {
    const data: ProductInterface[] = await (Product as ProductModel).find({
      _id: ids,
    });
    res.json(data);
    return;
  }
  const isAdmin = await isAdminRequest(req, res);
  if (!isAdmin) throw "not admin";
  const input = ProductValidateSchema.parse(req.body);
  const data = await productService.createProduct(input);
  res.json(data);
}

export async function GET(req: Request, res: Response) {
  if (req.query?.status as string) {
    if (req.query.number) {
      const data = await productService.getNewestStatusProducts(
        req.query.status as string,
        req.query.number as unknown as number
      );
      res.json(data);
    } else {
      res.json(undefined);
    }
  } else if (req.query?.category as string) {
    if (req.query.number) {
      const data = await productService.getCategoryN(
        req.query.category as string,
        req.query.number as unknown as number
      );
      res.json(data);
    } else {
      const data = await productService.getCategory(req.query.category as string);
      res.json(data);
    }
  } else if (req.query?.id) {
    const toGet = req.query.id as string | string[];
    const data = await productService.getProduct(toGet);
    res.json(data);
  } else if (req.query?.newest) {
    if (req.query.status) {
      const data = (await productService.getNewestStatusProducts(
        req.query.status as string,
        req.query.newest as unknown as number
      )) as ProductInterface[];
      res.json(data);
    } else {
      const data = await productService.getNewestProducts(req.query.newest as unknown as number);
      res.json(data);
    }
  } else {
    const page = Number(req.query.page as string) || 1;
    const filter = (req.query.filter as string) || "";
    const data = await productService.getAllProducts(page, filter);
    const maxPages = Math.ceil(await productService.countPages(filter));
    res.json({ products: data, maxPages });
  }
}

export async function PUT(req: Request, res: Response) {
  const isAdmin = await isAdminRequest(req, res);
  if (!isAdmin) throw "not admin";
  const input = ProductValidateSchema.parse(req.body);
  const data = await productService.updateProduct(input);
  res.json(data);
}

export async function DELETE(req: Request, res: Response) {
  const isAdmin = await isAdminRequest(req, res);
  if (!isAdmin) throw "not admin";
  if (req.query?.id) {
    const toDelete = req.query.id as string | string[];
    const data = await productService.deleteProduct(toDelete);
    res.json(data);
  }
}
