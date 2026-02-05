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
    newArrival: {
      type: Boolean,
      default: false
    },
    newArrivalFeatured: {
      type: Boolean,
      default: false,
      min: 3,
      max: 3
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      enum: [ "piece", "dozen"],
      default: "piece"
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "xl", "2xl", "3xl"],
      default: "M"
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
