import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You can only create listing for your account")
    );
  }
  try {
    const listing = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listing);
  } catch (error) {
    return next(error);
  }
};
