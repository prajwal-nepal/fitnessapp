import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import axios from "axios";

// Correctly specify the absolute path to the.env file
dotenv.config();

// Check if dotenv successfully loaded the.env file
if (process.env.NODE_ENV!== undefined) {
  console.log("Environment variables loaded successfully");
} else {
  console.error(".env file not loaded correctly");
}

// Verify MONGODB_URL and JWT_SECRET
console.log(`MONGODB_URL: ${process.env.MONGODB_URL}`);
console.log(`JWT_SECRET: ${process.env.JWT}`);

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", UserRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers",
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => {
        console.error("Failed to connect with Mongo");
        console.error(err);
      });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
