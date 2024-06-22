import mongoose from "mongoose";
import validator from "validator";

const supplierSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: [true, "Please provide your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    validate: [validator.isMobilePhone, "Please provide a valid mobile number"],
  },
  address: String,
  website: {
    type: String,
    lowercase: true,
    validate: [validator.isURL, "Please provide a valid website URL"],
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
});

export default mongoose.model("Supplier", supplierSchema);
