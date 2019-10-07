const express = require("express");
const app = express();
const router = express.Router();
const Category = require("./../controllers/categoryController");

router
  .route("/")
  .get(Category.getAllCategory)
  .post(Category.createCategory);
router
  .route("/:id")
  .get(Category.getCategory)
  .patch(Category.updateCategory);

module.exports = router;
