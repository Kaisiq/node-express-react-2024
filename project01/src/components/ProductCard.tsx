import type { ProductInterface } from "~/pages/api/products";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useContext } from "react";
import { CartContext } from "./CartContextProvider";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/router";
import { Card } from "./ui/card";

export function ProductCard({ product }: { product: ProductInterface }) {
	const { addProduct } = useContext(CartContext);
	const router = useRouter();
	return (
		<Card className="self-stretch" key={product._id}>
			<div className="group relative overflow-hidden rounded-lg">
				<Link href={"/product/" + product._id}>
					<span className="sr-only">View</span>
					<div className="relative">
						{product?.images?.[0] ? (
							<Image
								alt="Product 1"
								className="h-[300px] w-full object-cover"
								width={500}
								height={300}
								src={product.images[0]}
								style={{
									objectFit: "cover",
								}}
							/>
						) : (
							<Skeleton className="h-[300px] w-full" />
						)}
						{product.status === "sold" && (
							<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
								<span className="text-lg font-semibold text-white">
									Изчерпано
								</span>
							</div>
						)}
					</div>
				</Link>
				<div className="justify-space-between flex">
					<div className="flex flex-1 flex-col justify-between bg-white p-4 dark:bg-gray-950">
						<div className="grid gap-1">
							<h3 className="text-lg font-semibold md:text-xl">
								{product.name}
							</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{product.description}
							</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Размер: {product.size}
							</p>
						</div>
						<h4 className="text-base font-semibold md:text-lg">
							{product.price}лв
						</h4>
					</div>
					<div className="mr-5 flex flex-col gap-3 pt-4">
						<Button
							variant="outline"
							onClick={async () => {
								await router.push("product/" + product._id);
							}}
						>
							Разгледай
						</Button>
						{product.status !== "sold" && (
							<Button
								onClick={() => {
									addProduct(product._id);
								}}
							>
								Добави в количката
							</Button>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
}

export function SkeletonProductCard() {
	return (
		<Card className="self-stretch">
			<div className="group relative overflow-hidden rounded-lg">
				<div className="relative">
					<Skeleton className="h-[300px] w-full" />
				</div>
				<div className="justify-space-between flex">
					<div className="flex flex-1 flex-col justify-between bg-white p-4 dark:bg-gray-950">
						<div className="mb-1 grid gap-1">
							<Skeleton className="h-5 w-[200px]" />
							<Skeleton className="h-3 w-[300px]" />
							<Skeleton className="h-3 w-[350px]" />
							<Skeleton className="h-3 w-[350px]" />
						</div>
						<Skeleton className="h-4 w-[50px]" />
					</div>
					<div className="mr-5 flex flex-col gap-3 pt-4">
						<Skeleton>
							<Button className="w-[100px]" variant="link" />
						</Skeleton>
						<Skeleton>
							<Button className="w-[100px]" variant="link" />
						</Skeleton>
					</div>
				</div>
			</div>
		</Card>
	);
}
