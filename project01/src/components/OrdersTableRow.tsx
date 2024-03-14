import { Button } from "./ui/button";
import { TableRow, TableCell } from "./ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import type { OrderInterface } from "~/pages/api/orders";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/router";

export function OrdersTableRow({ order }: { order: OrderInterface }) {
	const router = useRouter();
	return (
		<TableRow key={order._id}>
			<TableCell>{order.flname}</TableCell>
			<TableCell>{order.email}</TableCell>
			<TableCell>{order.tel}</TableCell>
			<TableCell>{order.city}</TableCell>
			<TableCell>{order.address}</TableCell>
			<TableCell>{order.info}</TableCell>
			<TableCell>{order.productNames.join(" ")}</TableCell>
			<TableCell>
				<Select
					onValueChange={(value) => {
						const updatedOrder = { ...order, status: value };
						axios.put("/api/orders", updatedOrder).catch((err) => {
							console.log(err);
						});
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder={order.status} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="new">new</SelectItem>
						<SelectItem value="shipped">shipped</SelectItem>
						<SelectItem value="completed">completed</SelectItem>
						<SelectItem value="canceled">canceled</SelectItem>
					</SelectContent>
				</Select>
			</TableCell>
			<TableCell>
				{order.createdAt
					? order.createdAt.split(".")[0]?.replace("T", " ")
					: ""}
			</TableCell>
			<TableCell>{order.price}лв</TableCell>
			<TableCell>
				<Button
					size="icon"
					variant="ghost"
					onClick={async () => {
						await router.push("/admin/orders/delete/" + order._id);
					}}
				>
					<Trash2Icon className="h-4 w-4" />
					<span className="sr-only">Delete Order</span>
				</Button>
			</TableCell>
		</TableRow>
	);
}
