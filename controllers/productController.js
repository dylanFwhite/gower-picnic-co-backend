import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
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
  const mainProducts = await Product.find({
    type: { $in: ["luxury-picnic", "picnic"] },
  }).select(["_id", "name", "description", "imageCover"]);

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

const getAvailabilityCount = catchAsync(async (req, res) => {
  let orders = await Order.find({
    collectionDate: { $gt: new Date() },
  })
    .select(["collectionDate", "products"])
    .populate({ path: "products", select: "type" });

  if (!orders) {
    res.status(200).json({
      status: "success",
      data: [],
    });
  }

  const datesCount = getDatesCount(orders, req.params.type);

  const availabilityDates = datesCount.map((item) => {
    return {
      date: item.date,
      count: Math.max(0, 5 - item.count),
    };
  });

  res.status(200).json({
    status: "success",
    data: availabilityDates,
  });
});

const getUnavailableDates = catchAsync(async (req, res) => {
  const { luxuryPicnic, picnic } = req.body;

  let orders = await Order.find({
    collectionDate: { $gt: new Date() },
  })
    .select(["collectionDate", "products"])
    .populate({ path: "products", select: "type" });

  if (!orders) {
    res.status(200).json({
      status: "success",
      data: [],
    });
  }

  const luxuryPicnicNonAvailable = luxuryPicnic
    ? getDatesCount(orders, "luxury-picnic")
        .filter((item) => item.count >= 5)
        .map((item) => item.date)
    : [];
  const picnicNonAvailable = picnic
    ? getDatesCount(orders, "picnic")
        .filter((item) => item.count >= 5)
        .map((item) => item.date)
    : [];

  const nonDates = [...luxuryPicnicNonAvailable, ...picnicNonAvailable];
  res.status(200).json({
    status: "success",
    data: nonDates,
  });
});

const getDatesCount = (orders, type) => {
  const available = orders.map((order) => {
    const count = order.products.filter((prod) => prod.type == type).length;

    return {
      date: order.collectionDate,
      count,
    };
  });

  const dates = orders.map((order) => order.collectionDate);

  const datesUnique = dates.filter(
    (date, i, self) =>
      self.findIndex((d) => d.getTime() === date.getTime()) === i
  );
  const datesCount = datesUnique
    .map((date) => {
      return {
        date,
        count: available
          .map((item) =>
            item.date.getTime() === date.getTime() ? item.count : 0
          )
          .reduce((acc, curr) => acc + curr),
      };
    })
    .filter((item) => item.count !== 0);
  return datesCount;
};

export default {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getPicnics,
  getAddOns,
  getProducts,
  getAvailabilityCount,
  getUnavailableDates,
};
