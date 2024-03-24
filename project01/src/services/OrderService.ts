import { Order, type OrderModel } from "~/models/Order";
import { Product, type ProductModel } from "~/models/Product";
import type { OrderInterface } from "~/pages/api/orders";
import { ProductService } from "./ProductService";

const timeToImageDeletion = 50400000; // 14h
const productService = new ProductService();

export class OrderService {
	async createOrder(input: OrderInterface) {
		const result = await (Order as OrderModel).create(input);
		return { message: result ? "success" : "error" };
	}
	/* eslint-disable */
	async getOrder(input: string | string[]) {
		if (Array.isArray(input)) {
			const result = (await (Order as OrderModel).find({
				_id: input,
			})) as OrderInterface[];
			return result;
		} else {
			const result = (await (Order as OrderModel).find({
				_id: input,
			})) as OrderInterface[];
			return result[0];
		}
	}
	async getOrdersOf(input: string) {
		const result = (await (Order as OrderModel)
			.find({
				email: input,
			})
			.sort({ createdAt: -1 })) as OrderInterface[];
		return result;
	}
	/* eslint-enable */
	async getAllOrders() {
		const result = (await (Order as OrderModel)
			.find()
			.sort({ createdAt: -1 })
			.limit(50)) as unknown as OrderInterface[];
		return result;
	}

	async removePicturesFromOrderProducts(order: OrderInterface) {
		if (order.status !== "complete") return;
		try {
			for await (const productId of order.productIDs) {
				const images = await productService.getImages(productId);
				await productService.deleteImages(images);
			}
		} catch (err) {
			console.log(err);
		}
	}

	async patchOrder(_id: string, input: object) {
		const result = (await (Order as OrderModel).findOneAndUpdate(
			{ _id },
			input,
			{ new: true },
		)) as OrderInterface | undefined;
		if (!result) return { message: "error" };
		for await (const id of result.productIDs) {
			if (["new", "shipped", "completed"].includes(result.status)) {
				if (result.status === "completed") {
					setTimeout(
						this.removePicturesFromOrderProducts,
						timeToImageDeletion,
						result,
					);
				}
				const res = await (Product as ProductModel).updateOne(
					{ _id: id },
					{ status: "sold" },
				);
				if (!res) return { message: "error" };
			} else if (result.status === "canceled") {
				const res = await (Product as ProductModel).updateOne(
					{ _id: id },
					{ status: "ok" },
				);
				if (!res) return { message: "error" };
			}
		}
		return { message: "success" };
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
			if (["new", "shipped", "completed"].includes(rest.status)) {
				const res = await (Product as ProductModel).updateOne(
					{ _id },
					{ status: "sold" },
				);
				if (!res) return { message: "error" };
			}
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
	async deleteOrder(input: string) {
		const result: OrderInterface = (await (
			Order as OrderModel
		).findOneAndDelete({
			_id: input,
		}))!;
		if (!result) return { message: "error" };
		for await (const _id of result.productIDs) {
			const res = await (Product as ProductModel).updateOne(
				{ _id },
				{ status: "ok" },
			);
			if (!res) return { message: "error" };
		}
		return { message: "success" };
	}
}
