import { PropertyService } from "../services/property.service.js";

export class PropertyController {
  static async createProperty(req, res, next) {
    try {
      const propertyData = req.body;

      const createdProperty = await PropertyService.createProperty(
        propertyData
      );

      res.status(201).send(createdProperty);
    } catch (error) {
      next(error);
    }
  }
}
