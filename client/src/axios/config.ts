import axios from "axios";

const serverUrl = import.meta.env.VITE_REACT_SER_URL;
const localhost = import.meta.env.VITE_REACT_SER_URL_LOCAL;
const currentUrl = window.location.origin;

const axiosUrl = currentUrl.includes("localhost") ? localhost : serverUrl;
console.log(axiosUrl);

export const Axios = axios.create({
  baseURL: `${axiosUrl}/api`,
  withCredentials: true,
});

// Axios.interceptors.request.use((config) => {
//   config.cancelToken = new axios.CancelToken((cancel) => {
//     // Create a cancellation token for this request
//     config.cancel = cancel
//   })
//   return config
// })
