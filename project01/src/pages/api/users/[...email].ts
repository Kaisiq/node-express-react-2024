import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { mongooseConnect } from "~/lib/mongoose";
import { isAdminRequest, isUserRequest } from "~/server/auth";
import { UserService } from "~/services/UserService";

const userService = new UserService();

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await mongooseConnect();
	if (req.method === "PATCH") {
		if (!req?.query?.email) throw "Give Email";
		const email = req.query.email as string;
		const input: object = req.body;
		const isAdmin = await isAdminRequest(req, res);
		const isUser = await isUserRequest(req, res, email);
		if (!isAdmin || !isUser) throw "Cannot do that operation. Please log in";
		const result = await userService.patchUser(email, input);
		res.json(result);
	}
}
