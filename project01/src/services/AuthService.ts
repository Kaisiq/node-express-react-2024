export const adminEmails = ["dahudohu@gmail.com"];

export class AuthService {
	isAdmin(email: string) {
		if (adminEmails.includes(email)) {
			return true;
		}
		return false;
	}
}
