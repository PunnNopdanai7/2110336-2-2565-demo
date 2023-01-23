import axios from "axios";
import Cookies from "js-cookie";

export const client = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 20000,
  withCredentials: true,
});

client.interceptors.request.use((request) => {
  const token = Cookies.get("token");
  request.headers["Authorization"] = "Bearer " + token;
  return request;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired or invalid");
    }
    return Promise.reject(error);
  }
);
