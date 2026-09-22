import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

const TOKEN_EXPIRATION = "7d";

const generateToken = (user) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new AppError("Server authentication configuration error", 500);
  }

  return jwt.sign(
    {
      userId: user._id.toString(),
      tokenVersion: user.tokenVersion || 0,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: TOKEN_EXPIRATION,
    },
  );
};

const formatUserResponse = (user) => {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    emailVerified: user.emailVerified,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * Register User
 */
export const registerUserService = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new AppError("Username, email and password are required", 400);
  }

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw new AppError("Invalid registration data", 400);
  }

  const normalizedUsername = username.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedUsername.length < 2 || normalizedUsername.length > 50) {
    throw new AppError("Username must be between 2 and 50 characters", 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalizedEmail)) {
    throw new AppError("Please provide a valid email address", 400);
  }

  if (password.length < 8) {
    throw new AppError("Password must be at least 8 characters long", 400);
  }

  if (password.length > 72) {
    throw new AppError("Password cannot exceed 72 characters", 400);
  }

  const existingUser = await User.findOne({
    email: normalizedEmail,
  }).lean();

  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
  });

  const token = generateToken(user);

  return {
    token,
    user: formatUserResponse(user),
  };
};

/**
 * Login User
 */
export const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  if (typeof email !== "string" || typeof password !== "string") {
    throw new AppError("Invalid login credentials", 400);
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account is inactive", 403);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  user.lastLogin = new Date();

  await user.save();

  const token = generateToken(user);

  return {
    token,
    user: formatUserResponse(user),
  };
};

/**
 * Invalidate current JWT
 */
export const logoutUserService = async (userId) => {
  if (!userId) {
    throw new AppError("Authentication required", 401);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.tokenVersion += 1;

  await user.save();

  return true;
};

/**
 * Get Current Authenticated User
 */
export const getCurrentUserService = async (userId) => {
  if (!userId) {
    throw new AppError("Authentication required", 401);
  }

  const user = await User.findById(userId).lean();

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.isActive) {
    throw new AppError("Account is inactive", 403);
  }

  return formatUserResponse(user);
};

export default {
  registerUserService,
  loginUserService,
  logoutUserService,
  getCurrentUserService,
};
