import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import testRouter from "./routes/test.route.js";
import listingRouter from "./routes/lisitng.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Database.");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server running in port 3000.");
});

app.use("/api/user", testRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

//Middleware, Handling possible errors from http requests
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 501;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
