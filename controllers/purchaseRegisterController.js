const mongoose = require("mongoose");
const PurchaseRegister = require("./../models/purchaseRegister");
const productMaster = require("./../models/productMaster");
exports.addPurchaseEntry = async (req, res, next) => {
  const AddEntry = await PurchaseRegister.create({
    prouduct_id: req.body.product_id,
    qty: req.body.qty,
    category: req.body.category,
    vendor_name: req.body.vendor,
    po_no: req.body.po_no,
    amount: req.body.amount,
    purchase_date: req.body.purchase_date
  });
  if (AddEntry) {
    const getProduct = await productMaster.find({
      product_id: AddEntry.product_id
    });
    if (getProduct) {
      var qty = getProduct.qty;
      getProduct.qty = getProduct.qty + qty;
      getProduct.save();

      res.status(200).json({
        message: "product has registerd ",
        product: AddEntry,
        productMaster: getProduct
      });
    } else {
      const AddMasterEntry = await productMaster.create({
        prouduct_id: req.body.product_id,
        qty: req.body.qty,
        price: req.body.price
      });
      res.status(200).json({
        message: "product has registerd ",
        product: AddEntry,
        productMaster: AddMasterEntry
      });
    }
  }
};
exports.getProduct = (req, res, next) => {};
exports.updateProduct = (req, res, next) => {};
