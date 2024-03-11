import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Package2Icon } from "~/components/Icons";
import { SearchIcon } from "~/components/Icons";
import { PlusIcon } from "~/components/Icons";
import {
	TableHead,
	TableRow,
	TableHeader,
	TableCell,
	TableBody,
	Table,
} from "./ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { OrderInterface } from "~/pages/api/orders";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export function OrdersTable() {
	const [orders, setOrders] = useState<OrderInterface[]>([]);

	useEffect(() => {
		axios
			.get("/api/orders")
			.then((response: AxiosResponse<OrderInterface[]>) => {
				setOrders(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<>
			<header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
				<Link className="lg:hidden" href="#">
					<Package2Icon className="h-6 w-6" />
					<span className="sr-only">Home</span>
				</Link>
				<div className="w-full">
					<h1 className="text-lg font-semibold">Pending Orders</h1>
				</div>
				<form className="flex-1 md:flex-initial">
					<div className="relative">
						<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
						<Input
							className="bg-white pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
							placeholder="Search orders..."
							type="search"
						/>
					</div>
				</form>
				<Button className="rounded-full" size="icon" variant="outline">
					<PlusIcon className="h-4 w-4" />
					<span className="sr-only">New order</span>
				</Button>
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
				<div className="rounded-lg border p-2 shadow-sm">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Customer</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Telephone</TableHead>
								<TableHead>City</TableHead>
								<TableHead>Address</TableHead>
								<TableHead>Info</TableHead>
								<TableHead>Product Name</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Price</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders?.map((order) => {
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
													axios.put("/api/orders", updatedOrder);
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
										<TableCell>{order.createdAt}</TableCell>
										<TableCell>{order.price}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</main>
		</>
	);
}
