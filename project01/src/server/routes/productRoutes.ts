import {
  Product,
  type ProductModel,
  ProductValidateSchema,
  ProductsValidateSchema,
  ProductInterface,
} from "../models/Product";
import { adminOrStaffCheckMiddleware } from "./authRoutes";
import { ProductService } from "../services/ProductService";
import express, { Request, Response } from "express";

const productService = new ProductService();
const router = express.Router();

router
  .route("/")
  .get(async (req: Request, res: Response) => {
    await GET(req, res);
  })
  .post(adminOrStaffCheckMiddleware, async (req: Request, res: Response) => {
    await POST(req, res);
  });

router
  .route("/featured")
  .post(adminOrStaffCheckMiddleware, async (req: Request, res: Response) => {
    try {
      const products = req.body as string[];
      await productService.removeAllFeatured();
      const result = await productService.setNewFeatured(products);
      res.status(204).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  })
  .get(async (req: Request, res: Response) => {
    try {
      const featuredProducts = await productService.getFeatured();
      const randomNumber = Math.floor(Math.random() * featuredProducts.length);
      return res.json(featuredProducts[randomNumber]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
router
  .route("/:_id")
  .get(async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const document = await productService.getProduct(_id);
      const exists = !!document;
      res.json({ exists });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  })
  .put(adminOrStaffCheckMiddleware, async (req: Request, res: Response) => {
    await PUT(req, res);
  })
  .delete(adminOrStaffCheckMiddleware, async (req: Request, res: Response) => {
    await DELETE(req, res);
  });

export default router;

async function POST(req: Request, res: Response) {
  try {
    interface RB {
      ids: string[];
    }

    const { ids }: RB = req.body as RB;
    if (ids) {
      const data: ProductInterface[] = await (Product as ProductModel).find({
        _id: ids,
      });
      res.json(data);
      return;
    }
    const input = ProductValidateSchema.parse(req.body);
    const data = await productService.createProduct(input);
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error: " + err);
  }
}

async function GET(req: Request, res: Response) {
  if (req.query?.status as string) {
    if (req.query.number) {
      const data = await productService.getNewestStatusProducts(
        req.query.status as string,
        req.query.number as unknown as number
      );
      return res.json(data);
    } else {
      return res.json(undefined);
    }
  } else if (req.query?.category as string) {
    if (req.query.number) {
      const data = await productService.getCategoryN(
        req.query.category as string,
        req.query.number as unknown as number
      );
      return res.json(data);
    } else {
      const data = await productService.getCategory(req.query.category as string);
      return res.json(data);
    }
  } else if (req.query?.id) {
    const toGet = req.query.id as string | string[];
    const data = await productService.getProduct(toGet);
    return res.json(data);
  } else if (req.query?.newest) {
    if (req.query.status) {
      const data = (await productService.getNewestStatusProducts(
        req.query.status as string,
        req.query.newest as unknown as number
      )) as ProductInterface[];
      return res.json(data);
    } else {
      const data = await productService.getNewestProducts(req.query.newest as unknown as number);
      return res.json(data);
    }
  } else {
    const page = Number(req.query.page as string) || 1;
    const filter = (req.query.filter as string) || "";
    const data = await productService.getAllProducts(page, filter);
    const maxPages = Math.ceil(await productService.countPages(filter));
    return res.json({ products: data, maxPages });
  }
}

async function PUT(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const input = ProductValidateSchema.parse(req.body);
    if (input._id != _id) {
      const data = await productService.updateProduct({ ...input, _id });
      return res.json(data);
    }
    const data = await productService.updateProduct(input);
    return res.json(data);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
}

async function DELETE(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const data = await productService.deleteProduct(_id);
    return res.json(data);
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
}
