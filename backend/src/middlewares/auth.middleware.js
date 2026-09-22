import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Read token from HTTP-only cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Or read token from Authorization header
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("Authentication token is required", 401);
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new AppError("Authentication token has expired", 401);
      }

      throw new AppError("Invalid authentication token", 401);
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    if (!user.isActive) {
      throw new AppError("Account is inactive", 403);
    }

    const currentTokenVersion = user.tokenVersion || 0;
    const tokenVersion = decoded.tokenVersion ?? 0;

    if (tokenVersion !== currentTokenVersion) {
      throw new AppError("Authentication session has been revoked", 401);
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
      username: user.username,
    };

    req.userId = user._id.toString();

    return next();
  } catch (error) {
    return next(error);
  }
};

export default authMiddleware;
