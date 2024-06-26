import Order from "../models/orderModel.js";
import factory from "./handlerFactory.js";
import Email from "../utils/email.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const getAllOrders = factory.getAll(Order);

const getOrder = factory.getOne(Order, [
  { path: "customer" },
  { path: "products" },
]);

const createOrder = catchAsync(async (req, res, next) => {
  // Ensure that the product and collection dates are the same length
  const { products, collectionDates } = req.body;

  if (products.length !== collectionDates.length) {
    return next(
      new AppError("collectionDates and products must be the same length", 400)
    );
  }
  const order = await Order.create(req.body);
  const email = new Email({
    name: "Dylan White",
    email: "white.dylan@live.co.uk",
  });

  await email.send("Thanks for your order!");

  res.status(201).json({
    status: "success",
    data: order,
  });
});

const updateOrder = factory.updateOne(Order);

const deleteOrder = factory.deleteOne(Order);

export default {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
