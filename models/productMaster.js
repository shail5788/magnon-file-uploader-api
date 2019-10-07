const mongoose = require("mongoose");
const productMasterSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: [true, "product is required "]
  },
  qty: { type: Number, required: [true, "quantity is required"] },
  price: { type: Number, required: [true, "price is required "] }
});
module.exports = mongoose.model("ProductMaster", productMasterSchema);
