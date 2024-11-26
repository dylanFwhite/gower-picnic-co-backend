import express from "express";
import productController from "../controllers/productController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/picnic").get(productController.getPicnics);
router.route("/product").get(productController.getProducts);
router.route("/add-on").get(productController.getAddOns);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(authenticateUser, productController.updateProduct)
  .delete(authenticateUser, productController.deleteProduct);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(authenticateUser, productController.createProduct);

router.get("/availability/:type", productController.getAvailabilityCount);
router.post("/availability", productController.getUnavailableDates);

export default router;
