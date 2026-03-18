const dotenv = require("dotenv");
dotenv.config(); // ✅ Must be FIRST

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ CORS — allow your frontend origin (update in production)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./route/authRoutes");
const userRoutes = require("./route/userRoutes");
const contactRoutes = require("./route/contactRoutes");
const propertyRoutes = require("./route/propertyRoutes");
const enquiryRoutes = require("./route/enquiry");

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);       // ← AdminUsers.jsx DELETE /api/users/:id
app.use("/api/contact", contactRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/enquiry", enquiryRoutes);

app.get("/", (req, res) => {
  res.send("API is running... ✅");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
  console.log(`JWT_SECRET loaded: ${process.env.JWT_SECRET ? "✅ YES" : "❌ NOT FOUND"}`);
  console.log(`MONGO_URI loaded: ${process.env.MONGO_URI ? "✅ YES" : "❌ NOT FOUND"}`);
});