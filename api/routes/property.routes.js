import { Router } from "express";
import { PropertyController } from "../controllers/property.controller.js";

export const propertyRouter = Router();

propertyRouter.post("/", PropertyController.createProperty);
