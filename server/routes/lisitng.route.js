import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getUserListing } from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.get("/listings/:id", verifyToken, getUserListing);

export default listingRouter;
