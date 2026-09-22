import {
  registerUserService,
  loginUserService,
  logoutUserService,
  getCurrentUserService,
} from "../services/auth.service.js";

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};

/**
 * Register User
 */
export const userRegisterController = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body);

    res.cookie("token", result.token, getCookieOptions());

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.user,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Login User
 */
export const userLoginController = async (req, res, next) => {
  try {
    const result = await loginUserService(req.body);

    res.cookie("token", result.token, getCookieOptions());

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: result.user,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Logout User
 */
export const userLogoutController = async (req, res, next) => {
  try {
    await logoutUserService(req.userId);

    const cookieOptions = getCookieOptions();

    res.clearCookie("token", {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Get Current User
 */
export const currentUserController = async (req, res, next) => {
  try {
    const user = await getCurrentUserService(req.userId);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  userRegisterController,
  userLoginController,
  userLogoutController,
  currentUserController,
};
