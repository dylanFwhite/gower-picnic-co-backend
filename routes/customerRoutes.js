import express from "express";
import customerController from "../controllers/customerController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, customerController.getAllCustomers)
  .post(customerController.createCustomer);

router
  .route("/:id")
  .get(authenticateUser, customerController.getCustomer)
  .patch(authenticateUser, customerController.updateCustomer)
  .delete(authenticateUser, customerController.deleteCustomer);

export default router;
