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
	_id: z.string().min(4).or(z.literal("")),
	createdAt: z.string().min(4).optional().or(z.literal("")),
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

const orderService = new OrderService();

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await mongooseConnect();
	if (req.method === "PATCH") {
		if (!req?.query?.id) throw "Give id";
		const _id = req.query.id as string;
		const { email, ...rest } = OrderPatchSchema.parse(req.body);
		Object.keys(rest).forEach((key) => {
			if (rest[key as keyof typeof rest] === undefined) {
				delete rest[key as keyof typeof rest];
			}
		});
		const isAdmin = await isAdminRequest(req, res);
		const isUser = await isUserRequest(req, res, email);
		if (!isAdmin || !isUser) throw "Cannot do that operation. Please log in";
		const result = await orderService.patchOrder(_id, rest);
		res.json(result);
	}
}
