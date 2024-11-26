import catchAsync from "../utils/catchAsync.js";
import Admin from "../models/adminModel.js";
import AppError from "../utils/appError.js";
import { comparePassword, createJWT } from "../utils/auth.js";

export const login = catchAsync(async (req, res, next) => {
  const user = await Admin.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) return next(new AppError("Invalid email or password", 403));

  const token = createJWT({ userId: user._id, email: user.email });

  const oneDay = 1000 * 60 * 60 * 24;

  // Store JWT as http only cookie is best practice
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ msg: "Admin logged in" });
});

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "User logged out" });
};
