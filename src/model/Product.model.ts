import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    newprice: {
        type: Number,
        required: true,
    },
    comparePrice: {
        type: Number
    },
    image: {
        type: String,
        required: true,
    },
    imagePublicId: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      enum: ["kg", "gram", "piece", "dozen", "liter"],
      default: "kg"
    },
    status: {
      type: String,
      enum: ["active", "inactive", "out-of-stock"],
      default: "active"
    },
    isFeatured: {
      type: Boolean,
      default: false
    }

}, {timestamps: true});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
