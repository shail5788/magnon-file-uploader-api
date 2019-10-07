const Product = require("./../models/product");
exports.createProduct = async (req, res, next) => {
  console.log(req.body);
  const newProduct = await Product.create({
    product_id: req.body.product_id,
    title: req.body.title,
    size: req.body.size,
    color: req.body.color,
    category: req.body.category,
    brand: req.body.brand,
    mrp: req.body.mrp
  });
  res.status(200).json({ message: "product is created ", product: newProduct });
};
exports.getProducts = async (req, res, next) => {
  const products = await Product.find({});
  if (!products) {
    res.status(400).json({ message: "No product id founds " });
  }
  res.status(200).json({ message: "all products", products: products });
};
exports.getProduct = (req, res, next) => {};
exports.updateProduct = (req, res, next) => {};
