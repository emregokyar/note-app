import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API = process.env.HOST_API || "http://localhost:3000";

const BASE_API = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export default BASE_API;
