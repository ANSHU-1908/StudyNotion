const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");

// Routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const paymentRoutes = require("./routes/payment");
const profileRoutes = require("./routes/profile");
const liveClassRoutes = require("./routes/liveClass");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}));

// Connect to DB and Cloudinary
connectDB();
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/live", liveClassRoutes);

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "StudyNotion API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
