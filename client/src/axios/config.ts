import axios from 'axios'

const serverUrl = import.meta.env.VITE_REACT_SER_URL
const localhost = import.meta.env.VITE_REACT_SER_URL_LOCAL
const currentUrl = window.location.origin

const axiosUrl = currentUrl.includes('localhost') ? localhost : serverUrl

console.log(currentUrl, 'currenturl', axiosUrl, serverUrl)

export const Axios = axios.create({
  baseURL: `${localhost}/api`,
  withCredentials: true,
})
