import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { sentimentRateLimiter } from "../middlewares/rateLimit.middleware.js";

import {
  createSentimentController,
  getSentimentsController,
  getSentimentByIdController,
  deleteSentimentController,
  getSentimentStatsController,
} from "../controllers/sentiment.controller.js";

import {
  createSentimentSchema,
  getSentimentsSchema,
  sentimentIdSchema,
} from "../validations/sentiment.validation.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  sentimentRateLimiter,
  validate(createSentimentSchema),
  createSentimentController,
);

router.get("/", validate(getSentimentsSchema), getSentimentsController);

router.get("/stats", getSentimentStatsController);

router.get("/:id", validate(sentimentIdSchema), getSentimentByIdController);

router.delete("/:id", validate(sentimentIdSchema), deleteSentimentController);

export default router;
