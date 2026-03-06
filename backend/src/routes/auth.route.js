import { login, handleCallback } from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.get("/login", login);
router.get("/callback", handleCallback);

export default router;