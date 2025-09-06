import axios from "axios";
import { CONFIG } from "../../config";

const axiosInstance = axios.create({
  baseURL: CONFIG.backendDomain,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
