import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import type { ProductInterface } from "~/pages/api/products";
import { CartContext } from "./CartContextProvider";
import { Skeleton } from "~/components/ui/skeleton";
import axios, { type AxiosResponse } from "axios";

export function FeaturedProduct({ productID }: { productID: string }) {
	const [product, setProduct] = useState<ProductInterface>();
	const { addProduct } = useContext(CartContext);
	function addToCart() {
		if (product) addProduct(product._id);
	}
	useEffect(() => {
		axios
			.get("/api/products?id=" + productID)
			.then((res: AxiosResponse<ProductInterface>) => {
				setProduct(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	if (product) {
		return (
			<section className="w-full py-6 md:py-12">
				<div className="container px-4 md:px-6">
					<div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px] xl:gap-16">
						{product?.images?.[0] ? (
							<Image
								alt="FeaturedProduct"
								className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
								height="300"
								src={product.images[0]}
								width="500"
							/>
						) : (
							<Skeleton className="h-[330px] w-full" />
						)}
						<div className="space-y-4 text-center lg:text-left">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
									Featured
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
									{product.name}
								</h2>
								<p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									описание: {product.description}
								</p>
								<p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									размер: {product.size}
								</p>
								<p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									цена: {product.price}лв
								</p>
							</div>
							<Link
								className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
								href={"/product/" + product._id}
							>
								Разгледай
							</Link>
							<Button
								variant="default"
								className="ml-3 inline-flex h-10 items-center justify-center px-8"
								onClick={addToCart}
							>
								Добави в количката
							</Button>
						</div>
					</div>
				</div>
			</section>
		);
	} else {
		return (
			<section className="w-full py-6 md:py-12">
				<div className="container px-4 md:px-6">
					<div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px] xl:gap-16">
						<Skeleton className="h-[330px] w-full" />
						<div className="space-y-4 text-center lg:text-left">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
									Featured
								</div>
								<Skeleton className="h-12 w-[250px]" />
								<Skeleton className="h-3 w-[400px]" />
								<Skeleton className="h-3 w-[500px]" />
								<Skeleton className="h-3 w-[400px]" />
								<Skeleton className="h-5 w-[50px]" />
							</div>
							<Skeleton className="inline-flex h-10">
								<Button variant="link" className="px-16" />
							</Skeleton>
							<Skeleton className="ml-3 inline-flex h-10">
								<Button variant="link" className="px-16" />
							</Skeleton>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
