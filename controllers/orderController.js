import Order from "../models/orderModel.js";
import factory from "./handlerFactory.js";

const getAllOrders = factory.getAll(Order);

const getOrder = factory.getOne(Order, [
  { path: "customer" },
  { path: "products" },
]);

const updateOrder = factory.updateOne(Order);

const deleteOrder = factory.deleteOne(Order);

export default {
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
