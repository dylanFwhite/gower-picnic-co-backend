import express from "express";
import supplierController from "../controllers/supplierController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(supplierController.getAllSuppliers)
  .post(authenticateUser, supplierController.createSupplier);

router
  .route("/:id")
  .get(supplierController.getSupplier)
  .patch(authenticateUser, supplierController.updateSupplier)
  .delete(authenticateUser, supplierController.deleteSupplier);

export default router;
