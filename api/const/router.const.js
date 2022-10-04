import { Router } from "express";
import { listingsRouter } from "../routes/listings.routes.js";
import { authRouter } from "../routes/auth.routes.js";
import { authValidator } from "../middlewares/auth.middleware.js";
import { usersRouter } from "../routes/users.routes.js";
import { propertyRouter } from "../routes/property.routes.js";

export const globalRouter = Router();

globalRouter.use("/listings", authValidator, listingsRouter);
globalRouter.use("/auth", authRouter);
globalRouter.use("/user", authValidator, usersRouter);
globalRouter.use("/property-details", authValidator, propertyRouter);
