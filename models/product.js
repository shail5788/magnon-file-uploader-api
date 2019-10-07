const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  product_id: {
    type: String,
    required: [true, "product id is required"]
  },
  title: { type: String, required: [true, "title is required"] },
  color: { type: String, required: [true, "product color is required"] },
  size: { type: String, required: [true, "product size is required"] },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "Each and every Product has a category"]
  },
  brand: { type: String, required: [true, "Brand must be enter"] },
  mrp: { type: Number, required: [true, "Each product has MRP"] }
});

module.exports = mongoose.model("Product", productSchema);
