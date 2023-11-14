import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Api testing." });
});

router.post("/update/:id", verifyToken, updateUser);
export default router;
