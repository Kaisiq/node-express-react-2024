import { AdminLayout } from "~/components/AdminLayout";
import { useRouter } from "next/router";
import { AddProduct } from "~/components/AddProduct";
import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "~/components/Spinner";
import type { ProductInterface } from "~/pages/api/products";

export default function Component() {
	const router = useRouter();
	const [productInfo, setProductInfo] = useState<ProductInterface>({
		name: "",
		price: null as unknown as number,
		description: "",
		category: "",
		size: "",
		status: "",
		_id: "",
		images: [],
	});
	const itemID = router.query.id
		? Array.prototype.join.call(router.query.id, "")
		: "";

	useEffect(() => {
		if (!itemID) {
			return;
		}
		axios
			.get("/api/products?id=" + itemID)
			.then((res: AxiosResponse<ProductInterface>) => {
				setProductInfo(res.data);
			})
			.catch((err) => {
				console.log(err);
				return;
			});
	}, [itemID]);
	return (
		<AdminLayout>
			<main className="p-10">
				<h1 className="text-lg font-semibold md:text-2xl">
					editing product with id: {itemID}
				</h1>
				{productInfo?._id ? <AddProduct {...productInfo} /> : <Spinner />}
			</main>
		</AdminLayout>
	);
}
