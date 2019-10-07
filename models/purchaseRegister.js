const mongoose = require("mongoose");
const purchaseRegisterSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: [true, "product is required"]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "Each and every Product has a category"]
  },
  qty: { type: Number, required: [true, "quantity is required"] },
  vendor_name: { type: String, required: [true, "vendor name is required"] },
  po_no: { type: String, required: [true, "Enter Purchased orderd no"] },
  amount:{type:Number,require[true,"Amount is required"]},
  purchase_date: { type: Date, default: Date.now }
});
module.exports = mongoose.model("PurchaseRegister", purchaseRegisterSchema);
