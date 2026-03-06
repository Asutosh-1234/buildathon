import { Router } from "express";
import healthCheck from "./helthcheck.route.js";
import auth from "./auth.route.js";

const router = Router();


router.use("/healthCheck", healthCheck);
router.use("/api/auth", auth);

export default router;
