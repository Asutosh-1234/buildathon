import { Router } from "express";
import healthCheck from "./helthcheck.route.js";

const router = Router();


router.use("/healthCheck", healthCheck);
export default router;
