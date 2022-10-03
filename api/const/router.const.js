import { Router } from "express";
import { listingsRouter } from "../routes/listings.routes.js";
import { authRouter } from "../routes/auth.routes.js";
import { authValidator } from "../middlewares/auth.middleware.js";

export const globalRouter = Router();

globalRouter.use("/listings", authValidator, listingsRouter);
globalRouter.use("/auth", authRouter);
