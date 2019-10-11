const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const authHelper = require("./controllers/authController");

const userRoute = require("./routes/user");
const fileuploadRoute = require("./routes/fileupload");

const corsMiddleware=require("./middleware/cors");
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(corsMiddleware);
app.use(express.static(`${__dirname}/uploads`));
app.use(express.json());


app.post("/signup", authHelper.signUp);
app.post("/signin", authHelper.login);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/file-upload",fileuploadRoute);

module.exports = app;
