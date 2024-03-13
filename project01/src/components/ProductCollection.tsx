import {
	ClothingSlotsList,
	EmptyClothingSlotsList,
} from "~/components/ClothingSlotsList";
import { useEffect, useState } from "react";
import { ProductInterface } from "~/pages/api/products";
import axios, { AxiosResponse } from "axios";

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
			});
	}, []);

	if (data && data.length > 0) {
		return <ClothingSlotsList data={data} n={n} />;
	} else {
		return <EmptyClothingSlotsList n={min(3, n)} />;
	}
}
