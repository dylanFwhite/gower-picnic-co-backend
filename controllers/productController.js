import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import factory from "./handlerFactory.js";

const getAllProducts = factory.getAll(Product);

const getProduct = catchAsync(async (req, res, next) => {
  let query = Product.findById(req.params.id);
  query = query.populate({ path: "suppliers" });

  const doc = await query;

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

const createProduct = factory.createOne(Product);

const updateProduct = factory.updateOne(Product);

const deleteProduct = factory.deleteOne(Product);

const getPicnics = catchAsync(async (req, res, next) => {
  const mainProducts = await Product.find({ type: "picnic" }).select([
    "_id",
    "name",
    "description",
    "imageCover",
  ]);

  if (!mainProducts) {
    return next(new AppError("Could not find any main products", 404));
  }

  res.status(200).json({
    status: "success",
    data: mainProducts,
  });
});

const getAddOns = catchAsync(async (req, res, next) => {
  const addOns = await Product.find({ type: "addOn" }).select([
    "name",
    "description",
    "imageCover",
    "price",
  ]);

  if (!addOns) {
    return next(new AppError("Could not find any add ons", 404));
  }

  res.status(200).json({
    status: "success",
    data: addOns,
  });
});

const getProducts = catchAsync(async (req, res, next) => {
  const addOns = await Product.find({ type: "product" }).select([
    "name",
    "description",
    "imageCover",
    "price",
  ]);

  if (!addOns) {
    return next(new AppError("Could not find any add ons", 404));
  }

  res.status(200).json({
    status: "success",
    data: addOns,
  });
});

export default {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getPicnics,
  getAddOns,
  getProducts,
};
