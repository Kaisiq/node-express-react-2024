import { AdminLayout } from "~/components/AdminLayout";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import axios from "axios";

export default function Component() {
	const router = useRouter();
	const id = router.query.id as string;

	function goBack() {
		router.push("/admin/orders").catch((err) => {
			console.log(err);
		});
	}

	function deleteOrder() {
		axios
			.delete("/api/orders?id=" + id)
			.then(() => {
				router.push("/admin/orders").catch((err) => {
					console.log(err);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<AdminLayout>
			<main className="p-10">
				<h1 className="text-center text-lg font-semibold md:text-2xl">
					Сигурен ли си че искаш да изтриеш поръчка с номер: {id}
				</h1>
				<div className="mt-10 flex justify-center">
					<Button
						onClick={deleteOrder}
						variant="destructive"
						className="mr-10 w-[10%]"
					>
						Да
					</Button>
					<Button onClick={goBack} className="w-[10%]">
						Не
					</Button>
				</div>
			</main>
		</AdminLayout>
	);
}
