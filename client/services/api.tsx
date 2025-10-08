import axios from "axios";
import { getBackendApi } from "../constants/backend_api";

const api = axios.create({
  timeout: 60000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

// * Interceptor to dynamically update baseURL before every request
api.interceptors.request.use((config) => {
  config.baseURL = getBackendApi(); // * always use the latest backend value
  return config;
});

export default api;
