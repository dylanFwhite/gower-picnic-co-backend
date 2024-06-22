import Order from "../models/orderModel.js";
import factory from "./handlerFactory.js";

const getAllOrders = factory.getAll(Order);

const getOrder = factory.getOne(Order, [
  { path: "customer" },
  { path: "products" },
]);

const createOrder = factory.createOne(Order);

const updateOrder = factory.updateOne(Order);

const deleteOrder = factory.deleteOne(Order);

export default {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
