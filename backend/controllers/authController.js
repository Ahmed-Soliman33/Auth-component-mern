const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const generateToken = (id) =>
  jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });

const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict", //  prevent CSRF attacks
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/api/auth/refresh-token", // Only send the refresh token on the refresh route
};

// Send JWT and refresh token in the response
const sendResponse = async (res, user, code) => {
  const token = generateToken(user._id);
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );

  // Update user with refresh token
  const updated = await User.findByIdAndUpdate(user._id, { refreshToken });
  console.log(" User Updated", updated);

  // Send JWT and refresh token in the response
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  // user.password = undefined; // Don’t send password in the response
  res.status(code).json({ status: "success", token, data: user });
};

// @desc Signup
// @route POST /api/v1/auth/signup
// @access Public

exports.signup = asyncHandler(async (req, res) => {
  // (1) Create a new user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // (2) Generate Token and send it to the client
  sendResponse(res, user, 201);
});

// @desc Login
// @route POST /api/auth/login
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
  // (1) Check if user exists
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  // (2) Generate Token and send it to the client

  sendResponse(res, user, 201);
});

// @desc refresh AccessToken
// @route GET /api/auth/refresh-token
// @access Private
exports.refreshAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return next(new ApiError("No refresh token", 401));

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== refreshToken) {
    return next(new ApiError("Invalid refresh token", 403));
  }

  // Rotate the refresh token
  sendResponse(res, user, 200);
});

// @desc Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let accessToken = req.headers.authorization;

  if (accessToken && accessToken.startsWith("Bearer ")) {
    accessToken = accessToken.split(" ")[1];
  } else {
    return next(new ApiError("Not authorized, no token", 401));
  }

  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  req.user = user;
  next();
});

// @desc Logout
// @route POST /api/auth/logout
// @access Public
exports.logout = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
  }

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
    path: "/api/auth/refresh-token",
  });

  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
});

// @desc Get current user
// @route GET /api/auth/me
// @access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({ status: "success", data: user });
});
