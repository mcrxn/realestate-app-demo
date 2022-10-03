import { BadRequest, NotFound, GeneralError } from "../const/error.const.js";
import { Listing } from "../models/listing.model.js";

export class ListingsService {
  static async createListing(user, listingData) {
    try {
      const { title, body } = listingData;
      const listing = new Listing({ title, body, listedBy: user._id });

      const createdListing = await listing.save();

      user.listings.push(createdListing._id);

      await user.save();

      return createdListing;
    } catch (error) {
      throw new BadRequest(`Couldnt create listing, ERROR: ${error}`);
    }
  }

  static async getAllListings() {
    try {
      const listings = await Listing.find({}).populate("listedBy", "fullname");

      return listings;
    } catch (error) {
      throw new GeneralError(`Couldn't fetch listings, ERROR: ${error}`);
    }
  }

  static async getListingById(listingId) {
    try {
      const listing = await Listing.findById(listingId).populate(
        "listedBy",
        "fullname"
      );

      if (!listing) throw "Listing not found";

      return listing;
    } catch (error) {
      throw new NotFound(`Couldn't fetch listing, ERROR: ${error}`);
    }
  }

  static async updateListing(user, listingId, updateData) {
    try {
      const allowedUpdates = ["body", "title"];

      const listing = await Listing.findOne({
        _id: listingId,
        listedBy: user._id,
      });

      if (!listing) throw "Listing Not Found";

      const updateKeys = Object.keys(updateData);

      updateKeys.forEach((key) => {
        if (allowedUpdates.includes(key)) {
          listing[key] = updateData[key];
        }
      });

      await listing.save();
    } catch (error) {
      throw new BadRequest(`Couldn't update listing, ERROR: ${error}`);
    }
  }

  static async deleteListing(user, listingId) {
    try {
      const listing = await Listing.findOneAndDelete({
        _id: listingId,
        listedBy: user._id,
      });

      // user.listings =

      if (!listing) throw "Listing Not found";

      // console.log(user.listings);
    } catch (error) {
      throw new NotFound(`Couldn't delete listing, ERROR: ${error}`);
    }
  }
}
2;
