const express = require("express");

const app = express();

const userRoute = require("./src/routes/UserRoute");
const courseRoute = require("./src/routes/CourseRoute");
const profileRoute = require("./src/routes/ProfileRoute");
const paymentRoute = require("./src/routes/PaymentRoute");
const dbconnect = require("./src/database/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { cloudinaryConnect } = require("./src/database/cloudinary");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);

app.get("/", (req, res) => {
  console.log("chalu");
  return res.json({
    success: true,
    message: "Hello",
  });
});

const listen = async () => {
  try {
    dbconnect();
    app.listen(PORT, () => {
      console.log(`the server is running at ${PORT}`);
    });
  } catch (error) {
    console.log("kem cho", error.message);
  }
};

listen();
