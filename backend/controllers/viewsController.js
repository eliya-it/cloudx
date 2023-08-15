const catchAsync = require("../utils/catchAsync");
const Book = require("../modules/bookModule");
const User = require("../modules/userModule");
const crypto = require("crypto");
const AppError = require("../utils/appError");
exports.home = catchAsync(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).render("home", {
    title: "الصفحة الرئيسية",
    books,
  });
});
exports.addBook = (req, res, next) => {
  res.status(200).render("addBook");
};
exports.addUser = (req, res, next) => {
  res.status(200).render("addUser");
};
exports.fullBookDetails = catchAsync(async (req, res, next) => {
  console.log(req.user);
  console.log(req.params.id);
  const book = await Book.findById(req.params.id);
  console.log(book);
  res.status(200).render("book", { book });
});
exports.login = (req, res, next) => {
  res.status(200).render("login");
};
exports.dashboard = (req, res, next) => {
  res.status(200).render("dashboard", { user: req.user });
};
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find({ id: { $ne: req.user.id } });
  console.log(allUsers);
  res.status(200).render("getAllUsers", { users: allUsers });
});
exports.forgotPassword = (req, res, next) => {
  res.status(200).render("forgotPassword");
};
exports.resetPassword = catchAsync(async (req, res, next) => {
  if (!req.params.token)
    return next(
      new AppError("عذراَ, يوجد خطأ في الرابط أو الرابط منتهي الصلاحية!", 404)
    );
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const curUser = await User.findOne({ passwordResetToken: hashedToken });
  if (!curUser)
    return next(
      new AppError("عذراَ, يوجد خطأ في الرابط أو الرابط منتهي الصلاحية!", 404)
    );
  console.log(req.params);

  res.status(200).render("resetPassword", { token: req.params.token });
});
