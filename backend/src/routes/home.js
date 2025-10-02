import express from "express";
import indexPage from "../controllers/homeController";

const router = express.Router();
router.get("/", indexPage);

export default router;
