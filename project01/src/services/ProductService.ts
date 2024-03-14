import axios from "axios";
import { Product, type ProductModel } from "~/models/Product";
import type { ProductInterface } from "~/pages/api/products";

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

export class ProductService {
	async deleteProcess(input: string) {
		const data = await (Product as ProductModel).findOne({
			_id: input,
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
			await (Product as ProductModel).deleteOne({ _id: input });
			return { message: "success" };
		} catch (error) {
			console.error(error);
			return { message: "success" };
		}
	}

	async updateProduct(input: ProductInterface) {
		const { _id, ...rest } = input;
		const result = await (Product as ProductModel).findOneAndUpdate(
			{ _id },
			{ ...rest },
			{ new: true },
		);
		return { message: result ? "success" : "error" };
	}

	async createProduct(input: ProductInterface) {
		const result = await (Product as ProductModel).create(input);
		return { message: result ? "success" : "error" };
	}

	async deleteProduct(input: string | string[]) {
		if (Array.isArray(input)) {
			for await (const el of input) {
				const result = await this.deleteProcess(el);
				if (!result) {
					return { message: "error" };
				}
			}
			return { message: "success" };
		} else {
			const res = await this.deleteProcess(input);
			return { message: res ? "success" : "error" };
		}
	}

	/* eslint-disable */
	async getProduct(input: string | string[]) {
		if (Array.isArray(input)) {
			const result = (await (Product as ProductModel).find({
				_id: input,
			})) as ProductInterface[];
			return result;
		} else {
			const result = (await (Product as ProductModel).find({
				_id: input,
			})) as ProductInterface[];
			return result[0];
		}
	}
	/* eslint-enable */

	async getAllProducts() {
		const results = (await (Product as ProductModel)
			.find()
			.limit(50)) as ProductInterface[];
		return results;
	}

	async getNewestProducts(n: number) {
		const results = (await (Product as ProductModel)
			.find({}, null, {
				sort: { updatedAt: -1 },
			})
			.limit(n)) as ProductInterface[];
		return results;
	}

	async getNewestStatusProducts(status: string, n: number) {
		const results = (await (Product as ProductModel)
			.find({ status: status }, null, {
				sort: { updatedAt: -1 },
			})
			.limit(n)) as ProductInterface[];
		if (n === 1) {
			return results[0];
		}
		return results;
	}

	async getCategory(category: string) {
		const results = (await (Product as ProductModel)
			.find({
				category: category,
			})
			.limit(50)) as ProductInterface[];
		return results;
	}

	async getCategoryN(category: string, n: number) {
		const results = (await (Product as ProductModel)
			.find({
				category: category,
			})
			.limit(n)) as ProductInterface[];
		return results;
	}
}
