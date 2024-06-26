import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  collectionDates: [
    {
      type: Date,
      required: [true, "An order must have at least one collectionDate"],
    },
  ],
  customer: {
    type: mongoose.Schema.ObjectId,
    required: [true, "An order must belong to a customer"],
    ref: "Customer",
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      required: [true, "An order must have at least one product"],
      ref: "Product",
    },
  ],
  price: {
    type: Number,
    required: [true, "Booking must have a price."],
  },
  paid: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Order", orderSchema);
