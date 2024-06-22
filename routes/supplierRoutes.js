import express from "express";
import supplierController from "../controllers/supplierController.js";

const router = express.Router();

router
  .route("/")
  .get(supplierController.getAllSuppliers)
  .post(supplierController.createSupplier);

router
  .route("/:id")
  .get(supplierController.getSupplier)
  .patch(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);

export default router;
