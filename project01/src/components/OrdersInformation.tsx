import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { OrderInterface } from "~/pages/api/orders";
export function OrdersInformation() {
	const [orders, setOrders] = useState<OrderInterface[]>();
	const { data: session } = useSession();
	useEffect(() => {
		if (!session || !session.user.email) return;
		axios
			.get(`/api/orders?email=${session.user.email}`)
			.then((res: AxiosResponse<OrderInterface[]>) => {
				setOrders(res.data);
			})
			.catch((err) => {
				console.log(err);
				return;
			});
	}, []);
	return (
		<section>
			<h2 className="mb-4 text-xl font-semibold">Order History</h2>
			<div className="grid gap-4">
				{orders &&
					orders.map((order) => {
						return (
							<div
								key={order._id}
								className="flex items-center justify-between rounded-md bg-white p-4 shadow dark:bg-gray-800"
							>
								<div>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										Order #12345
									</p>
									<p className="text-gray-700 dark:text-gray-300">
										March 15, 2024
									</p>
									{order.status === "canceled" && (
										<p className="font-medium text-red-500">{order.status}</p>
									)}
									{(order.status === "new" || order.status === "completed") && (
										<p className="font-medium text-green-500">{order.status}</p>
									)}
									{order.status === "shipped" && (
										<p className="font-medium text-yellow-500">
											{order.status}
										</p>
									)}
								</div>
								{order.status === "new" && (
									<Button variant="destructive">Cancel Order</Button>
								)}
							</div>
						);
					})}
			</div>
		</section>
	);
}
