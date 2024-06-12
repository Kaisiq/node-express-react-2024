import axios from "axios";
import api from "~/lib/api";
import { SERVER } from "~/lib/utils";

export class AuthService {
  async isAdmin() {
    const isAdmin = (await api.get(`${SERVER}/auth/admin`)).data as boolean;
    // const isAdmin = await axios.post("/api/authAdmin", {
    //   email,
    // });
    return isAdmin;
  }
}
