import { Router } from "express";
import { createPaymentIntent } from "../controllers/checkoutController.js";

const router = Router();

router.post("/create-payment-intent", createPaymentIntent);

export default router;
