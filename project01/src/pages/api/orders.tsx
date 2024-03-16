import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { mongooseConnect } from "~/lib/mongoose";
import { OrderService } from "~/services/OrderService";
import { isAdminRequest, isUserRequest } from "~/server/auth";

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
	_id: z.string().min(4).optional().or(z.literal("")),
	createdAt: z.string().min(4).optional().or(z.literal("")),
});

export type OrderInterface = z.infer<typeof OrderFormSchema>;

const orderService = new OrderService();

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await mongooseConnect();
	if (req.method === "POST") {
		const order = OrderFormSchema.parse(req.body);
		const data = await orderService.createOrder(order);
		res.json(data);
	}
	if (req.method === "GET") {
		if (req?.query?.id) {
			await isAdminRequest(req, res);
			const data = await orderService.getOrder(req.query.id);
			res.json(data);
		} else if (req?.query?.email) {
			await isUserRequest(req, res, req.query.email as string);
			const data = await orderService.getOrdersOf(req.query.email as string);
			res.json(data);
		} else {
			await isAdminRequest(req, res);
			const data = await orderService.getAllOrders();
			res.json(data);
		}
	}
	if (req.method === "PUT") {
		await isAdminRequest(req, res);
		const data = OrderFormSchema.parse(req.body);
		const result = await orderService.updateOrder(data);
		res.json(result);
	}
	if (req.method === "DELETE") {
		await isAdminRequest(req, res);
		if (req.query?.id) {
			const data = await orderService.deleteOrder(req.query.id as string);
			res.json(data);
		}
	}
}
