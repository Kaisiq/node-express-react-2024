import { Order, type OrderModel } from "~/models/Order";
import { Product, type ProductModel } from "~/models/Product";
import type { OrderInterface } from "~/pages/api/orders";

export class OrderService {
	async createOrder(input: OrderInterface) {
		const result = await (Order as OrderModel).create(input);
		return { message: result ? "success" : "error" };
	}
	async getOrder(input: string | string[]) {
		if (Array.isArray(input)) {
			const result = (await Order.find({
				_id: input,
			})) as OrderInterface[];
			return result;
		} else {
			const result = (await Order.find({
				_id: input,
			})) as OrderInterface[];
			return result[0];
		}
	}
	async getAllOrders() {
		const result = (await (Order as OrderModel)
			.find()
			.sort({ createdAt: -1 })
			.limit(50)) as unknown as OrderInterface[];
		return result;
	}
	async updateOrder(input: OrderInterface) {
		const { _id, ...rest } = input;
		const result = await (Order as OrderModel).findOneAndUpdate(
			{ _id },
			{ ...rest },
			{ new: true },
		);
		if (!result) return { message: "error" };
		for await (const _id of rest.productIDs) {
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
