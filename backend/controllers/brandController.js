const Brand = require("../models/Brand");
const factory = require("./factoryController");

// @desc Create a new brand
// @route POST /api/v1/brands
// @access Private

exports.createBrand = factory.createOne(Brand);

// exports.createBrand = asyncHandler(async (req, res) => {
//   const brand = await Brand.create(req.body);

//   res.status(201).json({ data: brand });
// });

// @desc Get all brands
// @route GET /api/v1/brands
// @access Public

exports.getBrands = factory.getAll(Brand);


// exports.getBrands = asyncHandler(async (req, res) => {
//   // const page = Number(req.query.page) || 1;
//   // const limit = Number(req.query.limit) || 5;
//   // const skip = (page - 1) * limit;
//   // const brands = await Brand.find({}).skip(skip).limit(limit);

//   // Count total documents for pagination
//   const countDocuments = await Brand.countDocuments();

//   // Build query
//   const apiFeature = new ApiFeatures(Brand.find(), req.query)
//     .search("Brand")
//     .limitFields()
//     .filter()
//     .sort()
//     .paginate(countDocuments);

//   const { mongooseQuery, paginationResults } = apiFeature;

//   // Execute query
//   const brands = await mongooseQuery;

//   res
//     .status(200)
//     .json({ results: brands.length, paginationResults, data: brands });
// });

// @desc Get Brand by ID
// @route GET /api/v1/brands/:id
// @access Public

exports.getBrandById = factory.getOne(Brand);

// exports.getBrandById = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const brand = await Brand.findById(id);
//   if (!brand) {
//     return next(new ApiError(`Brand with id: ${id} not found`, 404));
//   }

//   res.status(200).json({ data: brand });
// });

// @desc Update specific Brand
// @route PUT /api/v1/brands/:id
// @access Private

exports.updateBrand = factory.updateOne(Brand);

// exports.updateBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   if (req.body.name) {
//     req.body.slug = slugify(req.body.name);
//   }

//   const brand = await Brand.findByIdAndUpdate(id, req.body, {
//     new: true,
//   });
//   if (!brand) {
//     return next(new ApiError(`Brand with id: ${id} not found`, 404));
//   }

//   res.status(200).json({ data: brand });
// });

// @desc Delete specific Brand
// @route DELETE /api/v1/brands/:id
// @access Private

exports.deleteBrand = factory.deleteOne(Brand);

// exports.deleteBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const brand = await Brand.findByIdAndDelete(id);
//   if (!brand) {
//     // res.status(404).json({ msg: `Brand with id: ${id} not found` });
//     return next(new ApiError(`Brand with id: ${id} not found`, 404));
//   }

//   res.status(200).send();
// });
