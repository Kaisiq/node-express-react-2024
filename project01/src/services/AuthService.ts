import api from "~/lib/api";
import { SERVER } from "~/lib/utils";

export class AuthService {
  async isAdmin() {
    const isAdmin = (await api.get(`${SERVER}/auth/admin`)).data as boolean;
    return isAdmin;
  }

  async getUser() {
    const userEmail = (await api.get(`${SERVER}/auth/profile`)).data.user.email as
      | string
      | undefined;
    return userEmail ? userEmail : "";
  }
}
