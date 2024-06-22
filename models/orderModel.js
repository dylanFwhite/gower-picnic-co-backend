import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  orderDate: {
    type: Date,
    required: true,
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
  price: {
    type: Number,
    require: [true, "Booking must have a price."],
  },
  paid: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Order", orderSchema);
