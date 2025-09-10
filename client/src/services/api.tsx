import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API, // * load from .env "VITE_BACKEND_API" should be present
  withCredentials: true, // * for sending cookies/token
});

export default api;
