const express = require("express");
const csurf = require("csurf");
const {
  signup,
  login,
  refreshAccessToken,
  logout,
  getCsrfToken,
  getMe,
  protect,
} = require("../controllers/authController");
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax", // Changed to Lax to allow cookies in cross-origin requests
  },
});
const router = express.Router();

router.get("/csrf-token", csrfProtection, getCsrfToken);
router.post("/signup", csrfProtection, signup);
router.post("/login", csrfProtection, login);
router.get("/logout", csrfProtection, logout);

router.get("/refresh-token", refreshAccessToken);
router.get("/me", protect, getMe);

module.exports = router;
