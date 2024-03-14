import type { NextApiRequest, NextApiResponse } from "next";
import { Product, type ProductModel } from "~/models/Product";
import { isAdminRequest } from "~/server/auth";
import { z } from "zod";
import { ProductService } from "~/services/ProductService";
import { mongooseConnect } from "~/lib/mongoose";

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

export type ProductInterface = z.infer<typeof ProductSchema>;

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await mongooseConnect();
	if (req.method === "POST") {
		interface RB {
			ids: string[];
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
		if (req.query?.status as string) {
			if (req.query.number) {
				const data = await productService.getNewestStatusProducts(
					req.query.status as string,
					req.query.number as unknown as number,
				);
				res.json(data);
			} else {
				res.json(undefined);
			}
		} else if (req.query?.category as string) {
			if (req.query.number) {
				const data = await productService.getCategoryN(
					req.query.category as string,
					req.query.number as unknown as number,
				);
				res.json(data);
			} else {
				const data = await productService.getCategory(
					req.query.category as string,
				);
				res.json(data);
			}
		} else if (req.query?.id) {
			const data = await productService.getProduct(req.query.id);
			res.json(data);
		} else if (req.query?.newest) {
			const data = await productService.getNewestProducts(
				req.query.newest as unknown as number,
			);
			res.json(data);
		} else {
			const data = await productService.getAllProducts();
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
			const data = await productService.deleteProduct(req.query.id);
			res.json(data);
		}
	}
}
