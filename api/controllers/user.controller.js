import { UsersService } from "../services/user.service.js";

export class UsersController {
  static async getUserListings(req, res, next) {
    try {
      const user = req.user;
      const listings = await UsersService.getUserListings(user);

      res.status(200).send(listings);
    } catch (error) {
      next(error);
    }
  }
}
