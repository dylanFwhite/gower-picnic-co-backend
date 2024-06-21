import express from "express"
import orderController from "../controllers/orderController.js"

const router = express.Router()

router.route('/').get(orderController.getOrders)

export default router