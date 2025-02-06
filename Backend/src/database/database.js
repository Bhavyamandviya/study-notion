const mongoose = require("mongoose");
require("dotenv").config();
const dbconnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("BHai mein to chalu hogaya"))
    .catch((err) => console.log(err));
};

module.exports = dbconnect;
