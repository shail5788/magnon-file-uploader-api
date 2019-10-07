const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// mongo database connection code
mongoose
  .connect(process.env.DBNAME, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    console.log("database connected successfully ");
  });

app.listen(process.env.PORT, () => {
  console.log(`App is running on port no- ${process.env.PORT}`);
});
