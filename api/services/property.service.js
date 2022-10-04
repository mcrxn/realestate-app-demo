import { Property } from "../models/property.model.js";
import { BadRequest } from "../const/error.const.js";

export class PropertyService {
  static async createProperty(propertyData) {
    try {
      const property = new Property(propertyData);

      const createdProperty = await property.save();

      return createdProperty;
    } catch (error) {
      throw new BadRequest(`Couldn't add property details, ERROR:${error}`);
    }
  }
}
