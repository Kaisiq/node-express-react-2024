import type { ProductInterface } from "~/pages/api/products";
import { ProductCard } from "./ProductCard";
import { EmptyClothingSlotsList } from "./ClothingSlotsList";

export function LatestProducts({ products }: { products: ProductInterface[] }) {
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
