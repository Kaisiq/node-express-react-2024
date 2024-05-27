import axios from "axios";

export class AuthService {
	async isAdmin(email: string) {
		const isAdmin = await axios.post("/api/authAdmin", {
			email,
		});
		return isAdmin.data as boolean;
	}
}
