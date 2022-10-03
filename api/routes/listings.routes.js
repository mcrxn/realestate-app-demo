import { Router } from "express";
import { ListingsController } from "../controllers/listing.controller.js";

export const listingsRouter = Router();

//create listing
listingsRouter.post("/", ListingsController.createListing);
//get all listings
listingsRouter.get("/", ListingsController.getAllListings);
//get listing by id
listingsRouter.get("/:id", ListingsController.getListingById);
//update listing
listingsRouter.patch("/:id", ListingsController.updateListing);
//delete listing
listingsRouter.delete("/:id", ListingsController.deleteListing);
