import axios from "axios";
import dotenv, { config } from "dotenv";

///dotenv.config();
//const API = process.env.HOST_API || "http://localhost:3000";

const API = "http://localhost:3000";

const BASE_API = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

// Using token in the every request
BASE_API.interceptors.request.use(
  (config) => {
    // Saving the item to local web strorage
    const jwtToken = localStorage.getItem("accessToken");
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default BASE_API;
