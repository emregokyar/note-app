import express from "express";
import passport from "passport";
import {
  localLogin,
  logout,
  loginWithGoogle,
  createAccount,
  loginRequest,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", createAccount);
router.get("/logout", logout);
router.get("/auth/google", loginRequest);
router.get("/auth/google/home", loginWithGoogle);
router.post("/login", localLogin);

export default router;
