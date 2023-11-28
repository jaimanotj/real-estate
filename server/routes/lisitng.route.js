import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getUserListing,
  deleteListing,
} from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.get("/listings/:id", verifyToken, getUserListing);
listingRouter.post("/create", verifyToken, createListing);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);

export default listingRouter;
