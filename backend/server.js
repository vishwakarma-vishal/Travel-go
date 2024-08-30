const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const authRoutes = require("./routes/authRoute.js")
const listingRoutes = require("./routes/listingRoute.js")
const bookingRoutes = require("./routes/bookingRoute.js")
const userRoutes = require("./routes/userRoute.js")

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload({
  createParentPath: true
}));


// ROUTES
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

//database connection 
const dbConnect = require("./config/database.js");
dbConnect();

//cloudinary connection
const connectCloudinary = require("./config//cloudinary.js");
connectCloudinary();

//starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
});
