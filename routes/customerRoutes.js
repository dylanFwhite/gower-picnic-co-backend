import express from "express"
import customerController from "../controllers/customerController.js"

const router = express.Router()

router.route('/').get(customerController.getCustomers)

export default router