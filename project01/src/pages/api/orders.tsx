import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { OrderService } from "~/services/OrderService";

export const OrderFormSchema = z.object({
	flname: z.string().min(2, {
		message: "Моля не оставяйте полето празно",
	}),
	tel: z
		.string()
		.min(10, {
			message: "Моля напишете валиден телефонен номер",
		})
		.max(13, {
			message: "Моля напишете валиден телефонен номер",
		}),
	address: z.string().min(2, {
		message: "Моля въведете адрес",
	}),
	info: z.string(),
	city: z.string().min(1, {
		message: "Моля въведете валиден град",
	}),
	email: z.string(),
	price: z.number(),
	status: z.string(),
	productIDs: z.array(z.string()),
	productNames: z.array(z.string()),
	_id: z.string(),
	createdAt: z.string(),
});

export type OrderInterface = z.infer<typeof OrderFormSchema>;

const orderService = new OrderService();

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const order = OrderFormSchema.parse(req.body);
		const data = await orderService.createOrder(order);
		res.json(data);
	}
	if (req.method === "GET") {
		if (req?.query?.id) {
			const data = await orderService.getOrder(req.query.id);
			res.json(data);
		} else {
			const data = await orderService.getAllOrders();
			res.json(data);
		}
	}
	if (req.method === "PUT") {
		const data = OrderFormSchema.parse(req.body);
		const result = await orderService.updateOrder(data);
		res.json(result);
	}
}
