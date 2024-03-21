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
	async updateUser(input: UserInterface) {
		const { email, ...rest } = input;
		try {
			const res = await (User as UserModel).findOneAndUpdate({ email }, rest, {
				new: true,
			});
			if (!res) {
				return { message: "error" };
			}
			return { message: "success" };
		} catch (err) {
			console.log(err);
		}
	}

	async patchUser(email: string, input: object) {
		try {
			const res = await (User as UserModel).findOneAndUpdate({ email }, input, {
				new: true,
			});
			if (!res) {
				return { message: "error" };
			}
			return { message: "success" };
		} catch (err) {
			console.log(err);
		}
	}
}
