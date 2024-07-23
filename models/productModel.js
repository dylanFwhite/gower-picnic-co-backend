import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
    maxLength: [40, "A product name must no exceed 40 characters"],
    minLength: [4, "A product name must be at least 4 characters"],
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
    trim: true,
  },
  allergens: {
    type: [String],
  },
  nutrition: {
    type: [String],
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: "Discount price ({VALUE}) should be less than full price",
    },
  },
  priceHistory: [Number],
  type: {
    type: String,
    required: true,
    enum: ["picnic", "product", "addOn"],
  },
  suppliers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Supplier",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// MONGO DOCUMENT MIDDLEWARE
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model("Product", productSchema);
