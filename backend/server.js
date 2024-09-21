const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const authRoutes = require("./routes/authRoute.js");
const listingRoutes = require("./routes/listingRoute.js");
const bookingRoutes = require("./routes/bookingRoute.js");
const userRoutes = require("./routes/userRoute.js");
const path = require("path"); // Import path module

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload({
  createParentPath: true
}));

// ROUTES
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build'))); // Adjust path to your frontend build

// Catch-all handler to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Database connection 
const dbConnect = require("./config/database.js");
dbConnect();

// Cloudinary connection
const connectCloudinary = require("./config/cloudinary.js");
connectCloudinary();

// Starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
