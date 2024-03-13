import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { ProductCardAdmin } from "./ProductCardAdmin";
import { ProductInterface } from "~/pages/api/products";

export function ProductsList() {
	const [products, setProducts] = useState<ProductInterface[]>([]);
	useEffect(() => {
		axios
			.get("/api/products")
			.then((response: AxiosResponse<ProductInterface[]>) => {
				setProducts(response.data);
			})
			.catch((err) => {
				console.log(err);
				return;
			});
	}, []);
	return (
		<div className="mx-auto grid max-w-6xl items-start gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((product: ProductInterface) => {
				return <ProductCardAdmin key={product._id} {...product} />;
			})}
		</div>
	);
}
