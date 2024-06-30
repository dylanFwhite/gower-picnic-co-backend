import { Router } from "express";
import {
  createCheckoutSession,
  getSessionStatus,
} from "../controllers/checkoutController.js";

const router = Router();

router.post("/create-checkout-session", createCheckoutSession);
router.get("/session-status", getSessionStatus);

export default router;
