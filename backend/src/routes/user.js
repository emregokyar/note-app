import express from "express";
import { getUserInfo } from "../controllers/userController.js";
import verifyToken from "../middleware/jwtAuth.js";

const router = express.Router();
router.get("/user", verifyToken, getUserInfo);

export default router;
