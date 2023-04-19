import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
});
