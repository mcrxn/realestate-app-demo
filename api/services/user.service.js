import { NotFound } from "../const/error.const.js";

export class UsersService {
  static async getUserListings(user) {
    try {
      const listings = (await user.populate("listings")).listings;
      return listings;
    } catch (error) {
      throw new NotFound(`Couldn't get user's listings, ERROR: ${error}`);
    }
  }
}
