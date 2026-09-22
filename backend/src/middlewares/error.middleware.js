import AppError from "../utils/AppError.js";

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // Log errors for debugging
  if (process.env.NODE_ENV !== "test") {
    console.error({
      message: err.message,
      name: err.name,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    error = new AppError(`Invalid ${err.path}`, 400);
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {});

    const field = fields.length === 1 ? fields[0] : "Resource";

    error = new AppError(`${field} already exists`, 409);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = {};

    for (const key of Object.keys(err.errors)) {
      errors[key] = err.errors[key].message;
    }

    error = new AppError("Validation failed", 400, errors);
  }

  // Invalid JWT
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid authentication token", 401);
  }

  // Expired JWT
  if (err.name === "TokenExpiredError") {
    error = new AppError("Authentication token has expired", 401);
  }

  const statusCode = error.statusCode || 500;

  const response = {
    success: false,

    message:
      statusCode >= 500 && process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message || "Something went wrong",
  };

  // Include validation details when available
  if (error.errors) {
    response.errors = error.errors;
  }

  // Stack trace only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorMiddleware;
