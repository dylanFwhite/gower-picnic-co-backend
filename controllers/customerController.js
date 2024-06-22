import Customer from "../models/customerModel.js";
import factory from "./handlerFactory.js";

const getAllCustomers = factory.getAll(Customer);

const getCustomer = factory.getOne(Customer, { path: "orders" });

const createCustomer = factory.createOne(Customer);

const updateCustomer = factory.updateOne(Customer);

const deleteCustomer = factory.deleteOne(Customer);

export default {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
