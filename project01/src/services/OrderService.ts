import { mongooseConnect } from "~/lib/mongoose";
import { Order, OrderModel } from "~/models/Order";
import { Product, ProductModel } from "~/models/Product";
import { OrderInterface } from "~/pages/api/orders";
import { ProductService } from "./ProductService";

const productService = new ProductService();

export class OrderService {
	async updateOrder(input: OrderInterface) {
		const { _id, ...rest } = input;
		const result = await (Order as OrderModel).findOneAndUpdate(
			{ _id },
			{ ...rest },
			{ new: true },
		);
		if (!result) return { message: "error" };
		for await (const _id of rest.productIDs) {
			const product = { _id, status: "ok" };
			if (rest.status === "canceled") {
				const res = await (Product as ProductModel).updateOne(
					{ _id },
					{ status: "ok" },
				);
				if (!res) return { message: "error" };
			}
		}

		return { message: "success" };
	}
}
