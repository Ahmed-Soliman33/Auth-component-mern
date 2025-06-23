const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create(req.body);

    res.status(201).json({ data: newDocument });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    let filterObj = {};
    if (req.filterObj) {
      filterObj = req.filterObj;
    }

    const countDocuments = await Model.countDocuments();

    console.log("Count Documents:", Model.modelName);

    // Build query
    const apiFeature = new ApiFeatures(Model.find(filterObj), req.query)
      .search(Model.modelName)
      .limitFields()
      .filter()
      .sort()
      .paginate(countDocuments);

    const { mongooseQuery, paginationResults } = apiFeature;

    // Execute query
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResults, data: documents });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`Document with id: ${id} not found`, 404));
    }

    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`Document with id: ${id} not found`, 404));
    }
    res.status(200).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError(`Document with id: ${id} not found`, 404));
    }

    res.status(200).json({ data: document });
  });
