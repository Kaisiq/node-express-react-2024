import api from "~/lib/api";
import { SERVER } from "~/lib/utils";

export class AuthService {
  async isAdmin() {
    const { isAdmin }: { isAdmin: number } = (await api.get(`${SERVER}/auth/admin`)).data;
    return isAdmin;
  }

  async getUser() {
    const userEmail = (await api.get(`${SERVER}/auth/profile`)).data.user.email as
      | string
      | undefined;
    return userEmail ? userEmail : "";
  }
}
