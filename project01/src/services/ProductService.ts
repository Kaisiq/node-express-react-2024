import axios from "axios";
import { Product, ProductInterface, ProductModel } from "~/models/Product";

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
	async getProduct(input: string | string[]) {
		const result = await (Product as ProductModel).find({ _id: input });
		return result;
	}
	async getAllProducts() {
		const results = (await (Product as ProductModel)
			.find()
			.limit(50)) as ProductInterface[];
		return results;
	}
}
