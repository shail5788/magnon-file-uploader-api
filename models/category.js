const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: { type: String, required: [true, "Category name is required"] },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("categories", categorySchema);
