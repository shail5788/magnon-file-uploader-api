const Category = require("./../models/category");
exports.createCategory = (req, res, next) => {
  if (req.body.name != "") {
    const newCategory = Category.create({
      name: req.body.name
    });
    res.status(200).json({
      message: "category has been created successfully!",
      category: newCategory
    });
  }
};
exports.getAllCategory = async (req, res, next) => {
  const categories = await Category.find({});
  res
    .status(200)
    .json({ message: "all categories list", category: categories });
};
exports.getCategory = (req, res, next) => {};
exports.updateCategory = (req, res, next) => {};
