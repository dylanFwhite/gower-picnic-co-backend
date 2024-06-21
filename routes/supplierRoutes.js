import express from "express"
import supplierController from "../controllers/supplierController.js"

const router = express.Router()

router.route('/').get(supplierController.getSuppliers)

export default router