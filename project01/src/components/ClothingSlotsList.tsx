import type { ProductInterface } from "~/pages/api/products";
import {
	EmptyProductCard,
	ProductCard,
	SkeletonProductCard,
} from "./ProductCard";

// TODO: fetch data from DB and add it
export function ClothingSlotsList({ data }: { data: ProductInterface[] }) {
	const clothingSlotList = [];
	for (const el of data) {
		clothingSlotList.push(<ProductCard key={el._id} product={el} />);
	}
	for (let i = clothingSlotList.length; i % 3 != 0; i++) {
		clothingSlotList.push(<EmptyProductCard key={i} />);
	}
	return (
		<section className="mx-5 grid grid-cols-1 gap-5 md:mx-10 md:grid-cols-2 md:p-6 lg:grid-cols-3">
			{clothingSlotList}
		</section>
	);
}

export function EmptyClothingSlotsList({ n }: { n: number }) {
	const clothingslotlist = [];
	for (let i = 0; i < n; i++) {
		clothingslotlist.push(<SkeletonProductCard key={i} />);
	}
	return (
		<section className="mx-5 grid grid-cols-1 gap-5 md:mx-10 md:grid-cols-2 md:p-6 lg:grid-cols-3">
			{clothingslotlist}
		</section>
	);
}
