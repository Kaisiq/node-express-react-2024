import {
	ClothingSlotsList,
	EmptyClothingSlotsList,
} from "~/components/ClothingSlotsList";
import { useEffect, useState } from "react";
import type { ProductInterface } from "~/pages/api/products";
import axios, { type AxiosResponse } from "axios";

function min(a: number, b: number) {
	return a < b ? a : b;
}

export function ProductCollection({
	category,
	n,
}: {
	category: string;
	n: number;
}) {
	const [data, setData] = useState<ProductInterface[]>([]);
	useEffect(() => {
		axios
			.get(`/api/products?category=${category}&number=${n}`)
			.then((result: AxiosResponse<ProductInterface[]>) => {
				setData(result.data);
			})
			.catch((err) => {
				console.log(err);
				return;
			});
	}, [n, category]);

	if (data && data.length > 0) {
		return <ClothingSlotsList data={data} />;
	} else {
		return <EmptyClothingSlotsList n={min(3, n)} />;
	}
}
