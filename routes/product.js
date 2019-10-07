const express = require("express");
const app = express();
const router = express.Router();
const Product = require("./../controllers/product");

router
  .route("/")
  .get(Product.getProducts)
  .post(Product.createProduct);
router
  .route("/:id")
  .get(Product.getProduct)
  .patch(Product.updateProduct);

module.exports = router;
