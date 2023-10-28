import express from "express";

const testRouter = express.Router();

testRouter.get("/test", (req, res) => {
  res.json({ message: "Api testing." });
});

export default testRouter;
