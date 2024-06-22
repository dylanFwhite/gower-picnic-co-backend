import Supplier from "../models/supplierModel.js";
import factory from "./handlerFactory.js";

const getAllSuppliers = factory.getAll(Supplier);

const getSupplier = factory.getOne(Supplier);

const createSupplier = factory.createOne(Supplier);

const updateSupplier = factory.updateOne(Supplier);

const deleteSupplier = factory.deleteOne(Supplier);

export default {
  getAllSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
