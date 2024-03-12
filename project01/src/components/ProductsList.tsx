import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { ProductCardAdmin } from "./ProductCardAdmin";
import { ProductService } from "~/services/ProductService";

interface Product {
	name: string;
	description: string;
	price: number;
	category: string;
	size: string;
	status: string;
	_id: string;
	images: string[];
}
const productService = new ProductService();

export function ProductsList() {
	const [products, setProducts] = useState<Product[]>([]);
	useEffect(() => {
		const getData = async () => {
			const data = await productService.getAllProducts();
			setProducts(data);
		};
		getData();

		// axios
		// 	.get("/api/products")
		// 	.then((response: AxiosResponse<Product[]>) => {
		// 		setProducts(response.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		return;
		// 	});
	}, []);
	return (
		<div className="mx-auto grid max-w-6xl items-start gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((product: Product) => {
				return <ProductCardAdmin key={product._id} {...product} />;
			})}
		</div>
	);
}
