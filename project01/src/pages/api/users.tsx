import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { mongooseConnect } from "~/lib/mongoose";
import { UserService } from "~/services/UserService";

export const UserFromSchema = z.object({
	name: z.string().min(2, {
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

export type UserInterface = z.infer<typeof UserFromSchema>;

const userService = new UserService();

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await mongooseConnect();
	if (req.method === "GET") {
		if (req?.query?.email) {
			const data = await userService.getUser(req.query.email);
			res.json(data);
		}
	}
}
