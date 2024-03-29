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
	_id: z.string().min(4).optional(),
	createdAt: z.string().min(4).optional(),
});

const OrderPatchSchema = z.object({
	flname: z.string().optional(),
	tel: z.string().optional(),
	address: z.string().optional(),
	info: z.string().optional(),
	city: z.string().optional(),
	email: z.string(),
	price: z.number().optional(),
	status: z.string().optional(),
	productIDs: z.array(z.string()).optional(),
	productNames: z.array(z.string()).optional(),
	createdAt: z.string().optional(),
});

export type OrderInterface = z.infer<typeof OrderFormSchema>;
export type OrderPatchInterface = z.infer<typeof OrderPatchSchema>;

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
			const isAdmin = await isAdminRequest(req, res);
			if (!isAdmin) throw "not admin";
			const data = await orderService.getOrder(req.query.id);
			res.json(data);
		} else if (req?.query?.email) {
			const isUser = await isUserRequest(req, res, req.query.email as string);
			if (!isUser) throw "not authenticated user";
			const data = await orderService.getOrdersOf(req.query.email as string);
			res.json(data);
		} else {
			const isAdmin = await isAdminRequest(req, res);
			if (!isAdmin) throw "not admin";
			const data = await orderService.getAllOrders();
			res.json(data);
		}
	}
	if (req.method === "PUT") {
		const data = OrderFormSchema.parse(req.body);
		const isAdmin = await isAdminRequest(req, res);
		const isUser = await isUserRequest(req, res, data.email);
		if (!isAdmin || !isUser) throw "Cannot do that operation. Please log in";
		const result = await orderService.updateOrder(data);
		res.json(result);
	}
	if (req.method === "DELETE") {
		const isAdmin = await isAdminRequest(req, res);
		if (!isAdmin) throw "not admin";
		if (req.query?.id) {
			const data = await orderService.deleteOrder(req.query.id as string);
			res.json(data);
		}
	}
}
