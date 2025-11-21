import { envs } from "@/envs";
import axios from "redaxios";

export const baseURL = envs.API_URL;

const api = axios.create({
  baseURL,
});

export default api;
