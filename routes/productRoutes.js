import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router.route("/main").get(productController.getMainProducts);
router.route("/add-on").get(productController.getAddOnProducts);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
