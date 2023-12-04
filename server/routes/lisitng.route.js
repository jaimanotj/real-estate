import express from "express";
import {
  createListing,
  getListings,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getUserListing,
  getListing,
  deleteListing,
  updateListing,
} from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.get("/listings/:id", verifyToken, getUserListing);
listingRouter.get("/getList/:id", getListing); //Used for fetching list for global view
listingRouter.post("/create", verifyToken, createListing);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);
listingRouter.post("/update/:id", verifyToken, updateListing);
listingRouter.get("/get", getListings); //get listings for search functionality

export default listingRouter;
