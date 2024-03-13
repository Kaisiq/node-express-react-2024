import type { ProductInterface } from "~/pages/api/products";
import { ProductCard, SkeletonProductCard } from "./ProductCard";
import { EmptyClothingSlotsList } from "./ClothingSlotsList";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export function LatestProducts({ n }: { n: number }) {
	const [products, setProducts] = useState<ProductInterface[]>([]);
	useEffect(() => {
		axios
			.get(`/api/products?newest=${n}`)
			.then((res: AxiosResponse<ProductInterface>) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	if (products && products.length > 0) {
		return (
			<>
				<h1 className="text-center text-3xl font-bold">Най-нови продукти</h1>
				<section className="mx-20 grid grid-cols-1 gap-10 p-10 md:grid-cols-2 md:p-6 lg:grid-cols-3">
					{products.map((product) => {
						return <ProductCard key={product._id} product={product} />;
					})}
				</section>
			</>
		);
	} else {
		return (
			<>
				<h1 className="text-center text-3xl font-bold">Най-нови продукти</h1>
				<section className="mx-20 grid grid-cols-1 gap-10 p-10 md:grid-cols-2 md:p-6 lg:grid-cols-3">
					<SkeletonProductCard />
					<SkeletonProductCard />
					<SkeletonProductCard />
				</section>
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
