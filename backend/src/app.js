import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";
import datasetRoutes from "./routes/dataset.routes.js";
import evaluationRoutes from "./routes/evaluation.routes.js";
import sentimentRoutes from "./routes/sentiment.routes.js";

import { generalRateLimiter } from "./middlewares/rateLimit.middleware.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(cookieParser());

// General API rate limiting
app.use(generalRateLimiter);

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Roman Urdu Sentiment Analyzer API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/datasets", datasetRoutes);

app.use("/api/evaluations", evaluationRoutes);

app.use("/api/sentiments", sentimentRoutes);

// Global error handler
app.use(errorMiddleware);

export default app;
