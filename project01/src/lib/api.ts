import axios from "axios";
import { SERVER } from "./utils";

const api = axios.create({
  baseURL: `${SERVER}`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const newToken = response.headers["authorization"];
    if (newToken) {
      localStorage.setItem("jwtToken", newToken.split(" ")[1]);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
