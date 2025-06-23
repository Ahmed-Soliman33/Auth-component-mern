const express = require("express");
const {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").post(protect, createBrand).get(getBrands);
router
  .route("/:id")
  .get(getBrandById)
  .put(protect, updateBrand)
  .delete(protect, deleteBrand);

module.exports = router;
