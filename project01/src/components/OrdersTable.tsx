import { Input } from "./ui/input";
import { SearchIcon } from "~/components/Icons";
import { TableHead, TableRow, TableHeader, TableBody, Table } from "./ui/table";
import type { OrderInterface } from "~/pages/api/orders";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { OrdersTableRow } from "./OrdersTableRow";

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
								<TableHead>Delete</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders?.map((order) => {
								return <OrdersTableRow key={order._id} order={order} />;
							})}
						</TableBody>
					</Table>
				</div>
			</main>
		</>
	);
}
