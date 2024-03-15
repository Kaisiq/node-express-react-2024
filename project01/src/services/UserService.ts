import { User, type UserModel } from "~/models/User";
import type { UserInterface } from "~/pages/api/users";

export class UserService {
	/* eslint-disable */
	async getUser(input: string | string[]) {
		if (Array.isArray(input)) {
			const result = (await (User as UserModel).find({
				email: input,
			})) as UserInterface[];
			return result;
		} else {
			const result = (await (User as UserModel).find({
				email: input,
			})) as UserInterface[];
			return result[0];
		}
	}
	/* eslint-enable */
}
