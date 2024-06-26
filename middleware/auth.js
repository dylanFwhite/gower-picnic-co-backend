import AppError from "../utils/appError.js";
import { verifyJWT } from "../utils/auth.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new AppError("Authentication failed", 403));

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch {
    return next(new AppError("Authentication failed", 403));
  }
};
