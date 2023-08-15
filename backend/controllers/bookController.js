const Book = require("../modules/bookModule");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (!file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image. Please upload only images!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,

  fileFilter: multerFilter,
});
exports.uploadBookPhoto = upload.single("photo");
exports.resizeBookPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `book-${Math.random()}-${Date.now()}.pdf`;
  const curImage = fs.writeFileSync(
    "../frontend/public/pp/" + req.file.filename,
    req.file.buffer
  );

  req.body.photo = req.file.filename;
  next();
};
// exports.createBook = factory.createOne(Book);
exports.createBook = catchAsync(async (req, res, next) => {
  console.log(req.user.department);
  console.log(req.body);
  let filterdBody = {};
  if (req.user?.id)
    filterdBody = {
      ...req.body,
      user: req.user.id,
      section: req.user.department,
    };
  console.log(filterdBody);
  const doc = await Book.create(filterdBody);
  res.status(201).json({
    status: "success",
    message: "Document was created successfully!",
    data: {
      doc,
    },
  });
});
// exports.createBook = (req, res) => {
//   console.log(req.files);
//   const { photo } = req.files;
//   console.log(photo);
//   res.send("Worked");
//   // photo.mv(__dirname + "/public/img/books/" + photo.name);
// };

exports.deleteBook = factory.deleteOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.getBook = factory.getOne(Book);
exports.getAllBooks = factory.getAll(Book);
exports.deactivateBook = factory.updateOne(Book);
