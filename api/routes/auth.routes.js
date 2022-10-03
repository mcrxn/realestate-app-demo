import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authValidator } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

//register user
authRouter.post("/register", AuthController.registerUser);
//login user
authRouter.post("/login", AuthController.loginUser);
//refresh access token
authRouter.post("/refresh-token", AuthController.refreshAccessToken);
//logout user
authRouter.post("/logout", authValidator, AuthController.logoutUser);
//logout all
authRouter.post("/logout-all", authValidator, AuthController.logoutAll);
