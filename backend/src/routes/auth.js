import express from "express";
import {
  logout,
  loginWithGoogle,
  loginWithLocal,
  createAccount,
  loginRequest,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", createAccount);
router.get("/logout", logout);
router.get("/auth/google", loginRequest);
router.get("/auth/google/home", loginWithGoogle);
router.get("/login", loginWithLocal);

export default router;
