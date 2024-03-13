import type { ProductInterface } from "~/pages/api/products";
import { ProductCard, SkeletonProductCard } from "./ProductCard";
import { ClothingSlotsList, EmptyClothingSlotsList } from "./ClothingSlotsList";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";

export function LatestProducts({ n }: { n: number }) {
	const [products, setProducts] = useState<ProductInterface[]>([]);
	useEffect(() => {
		axios
			.get(`/api/products?newest=${n}`)
			.then((res: AxiosResponse<ProductInterface[]>) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	if (products && products.length > 0) {
		return (
			<>
				<h1 className="mb-5 text-center text-3xl font-bold">
					Най-нови продукти
				</h1>
				<ClothingSlotsList data={products} />
			</>
		);
	} else {
		return (
			<>
				<h1 className="mb-5 text-center text-3xl font-bold">
					Най-нови продукти
				</h1>
				<EmptyClothingSlotsList n={3} />
			</>
		);
	}
}

export function SkeletonLatestProducts() {
	return (
		<>
			<h1 className="text-center text-3xl font-bold">Най-нови продукти</h1>
			<section className="mx-20 grid grid-cols-1 gap-10 p-10 md:grid-cols-2 md:p-6 lg:grid-cols-3">
				<EmptyClothingSlotsList n={3} />
			</section>
		</>
	);
}
