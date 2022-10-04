import { Router } from "express";

import { UsersController } from "../controllers/user.controller.js";

export const usersRouter = Router();

usersRouter.get("/listings", UsersController.getUserListings);
