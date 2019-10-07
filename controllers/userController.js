const User =require("../models/users");

exports.getAllUser = async(req, res, next) => {
  const users= await User.find({});
  const total= await User.count();
  res.status(200).json({"totalUser":total,"users":users});
};
exports.getUser = (req, res, next) => {
  res.status(200).json({ message: "get all user" });
};
exports.createUser = (req, res, next) => {
  res.status(200).json({ message: "user created routes" });
};
exports.editUser = (req, res, next) => {
  res.status(200).json({ message: "updated user" });
};
