import mongoose from "mongoose";
import validator from "validator";

const customerSchema = new mongoose.Schema({
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
    required: true,
    validate: [validator.isMobilePhone, "Please provide a valid mobile number"],
  },
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
  ],
});

export default mongoose.model("Customer", customerSchema);
