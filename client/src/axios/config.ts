import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_REACT_SER_URL,
  withCredentials: true,
});
