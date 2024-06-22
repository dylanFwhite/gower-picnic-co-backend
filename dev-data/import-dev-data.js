import fs from "fs-extra";
import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const products = fs.readJsonSync(`${__dirname}/../dev-data/products.json`);

const importData = async () => {
  try {
    await Product.create(products);
    console.log("Data Successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

try {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB Connection Successful!");
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

// node dev-data/import-dev-data.js --import
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
