import express from "express";

import {
  userRegisterController,
  userLoginController,
  userLogoutController,
  currentUserController,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import { authRateLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/register", authRateLimiter, userRegisterController);

router.post("/login", authRateLimiter, userLoginController);

router.post("/logout", authMiddleware, userLogoutController);

router.get("/me", authMiddleware, currentUserController);

export default router;
