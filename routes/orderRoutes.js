import express from "express";
import orderController from "../controllers/orderController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(authenticateUser, orderController.getAllOrders);

router
  .route("/:id")
  .get(authenticateUser, orderController.getOrder)
  .patch(authenticateUser, orderController.updateOrder)
  .delete(authenticateUser, orderController.deleteOrder);

export default router;
