import { ListingsService } from "../services/listing.service.js";

export class ListingsController {
  static async createListing(req, res, next) {
    try {
      const listingData = req.body;
      const { propertyId } = listingData;
      const user = req.user;
      const createdListing = await ListingsService.createListing(
        user,
        listingData,
        propertyId
      );

      res.status(201).send(createdListing);
    } catch (error) {
      next(error);
    }
  }

  static async getAllListings(req, res, next) {
    try {
      const listings = await ListingsService.getAllListings();

      res.status(200).send(listings);
    } catch (error) {
      next(error);
    }
  }

  static async getListingById(req, res, next) {
    try {
      const user = req.user;

      const listingId = req.params.id;

      const listing = await ListingsService.getListingById(user, listingId);

      res.send(listing);
    } catch (error) {
      next(error);
    }
  }

  static async updateListing(req, res, next) {
    try {
      const user = req.user;

      const listingId = req.params.id;

      const updateData = req.body;

      await ListingsService.updateListing(user, listingId, updateData);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  static async deleteListing(req, res, next) {
    try {
      const user = req.user;

      const listingId = req.params.id;

      await ListingsService.deleteListing(user, listingId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
