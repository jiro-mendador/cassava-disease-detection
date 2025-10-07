import { backend_api } from "@/app/constants/backend_api";
import axios from "axios";

const api = axios.create({
  baseURL: backend_api,
  timeout: 60000, // * Optional: Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
