// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./src/routes/user");
const profileRoutes = require("./src/routes/profile");
const courseRoutes = require("./src/routes/Course");
const paymentRoutes = require("./src/routes/Payments");
const contactUsRoute = require("./src/routes/Contact");
const dbconnect = require("./src/config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./src/config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Listening to the server
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
// End of code.
