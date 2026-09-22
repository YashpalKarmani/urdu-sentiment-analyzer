import { rateLimit } from "express-rate-limit";

const createRateLimiter = ({ windowMs, limit, message }) => {
  return rateLimit({
    windowMs,
    limit,

    standardHeaders: "draft-8",
    legacyHeaders: false,

    message: {
      success: false,
      message,
    },
  });
};

export const generalRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Too many requests. Please try again later.",
});

export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Too many authentication attempts. Please try again later.",
});

export const sentimentRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: "Too many sentiment analysis requests. Please try again later.",
});

export default {
  generalRateLimiter,
  authRateLimiter,
  sentimentRateLimiter,
};
