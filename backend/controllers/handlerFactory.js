const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/APIFeatures");
const AppError = require("../utils/appError");
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    let filterdBody = {};
    if (req.user?.id) filterdBody = { ...req.body, user: req.user.id };
    console.log(filterdBody);
    const doc = await Model.create(filterdBody);
    res.status(201).json({
      status: "success",
      message: "Document was created successfully!",
      data: {
        doc,
      },
    });
  });
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return console.error("There is no doc with this id!");
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.params, req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("There is no doc with this id!", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) return next(new AppError("There is no doc with this id!", 404));
    console.log("[++] Getting user");
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let searchByTitle;

    let payload;
    if (payload) payload = req.body.payload.trim();
    let filter = {};
    console.log(req.query.section);
    if (req.params.bookId) filter = { book: req.params.bookId };
    if (req.query.search) {
      searchByTitle = req.query.search;
      filter = { title: req.query.search };
    }
    if (req.query.section) {
      // searchByTitle = req.query.search;
      filter = { section: req.query.section };
    }
    if (req.user.role === "user") {
      filter = { ...filter, isPrivate: { $eq: false } };
    }
    // if (req.query.empName) {
    //   console.log("[+] calling getByEmpName()");
    //   filter = { ...filter, forEmp: req.query.empName };
    // }
    console.log(filter);
    const apiFeatures = new APIFeatures(Model.find(filter), req.query)

      .filter()
      .sort()
      .pagination();

    // .multiSections();

    const docs = await apiFeatures.query;
    console.log(docs);
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        docs,
      },
    });
  });
