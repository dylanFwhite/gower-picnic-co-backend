import Customer from "../models/customerModel.js";
import catchAsync from "../utils/catchAsync.js";
import factory from "./handlerFactory.js";

const getAllCustomers = factory.getAll(Customer);

const getCustomer = factory.getOne(Customer, { path: "orders" });

const createCustomer = catchAsync(async (req, res) => {
  const { email } = req.body;
  const customer = await Customer.findOne({ email });
  if (customer) {
    const { _id } = customer;
    return res.status(200).json({
      status: "success",
      data: {
        _id,
        email,
      },
    });
  }
  const newCustomer = await Customer.create(req.body);
  const { _id } = newCustomer;
  res.status(201).json({
    status: "success",
    data: {
      _id,
      email,
    },
  });
});

const updateCustomer = factory.updateOne(Customer);

const deleteCustomer = factory.deleteOne(Customer);

export default {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
