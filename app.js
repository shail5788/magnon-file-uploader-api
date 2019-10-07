const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const authHelper = require("./controllers/authController");

const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");

const corsMiddleware=require("./middleware/cors");
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(corsMiddleware);
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.post("/signup", authHelper.signUp);
app.post("/signin", authHelper.login);

app.use("/api/v1/user", userRoute);
// app.use("/api/v1/category", categoryRoute);
// app.use("/api/v1/product", productRoute);

module.exports = app;
