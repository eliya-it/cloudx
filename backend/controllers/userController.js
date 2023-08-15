const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const User = require("../modules/userModule");
const multerStorage = multer.memoryStorage();
const speakeasy = require("speakeasy");
const qrCode = require("qrcode");
const AppError = require("../utils/appError");

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image. Pleas upload only images!", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserphoto = upload.single("photo");
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});
const filterObject = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.getUser = factory.getOne(User);
exports.updateMe = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password || confirmPassword) {
    return next(
      new AppError(
        "This route is not for password updates! Please use /updateMypassword .",
        400
      )
    );
  }
  console.log(req.file);
  const filteredBody = filterObject(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;
  console.log(filteredBody);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  if (req.originalUrl.startsWith("/api")) {
    return res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }
  // res.redirect("/me");
});

exports.registerTwoFactorAuth = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const secret = speakeasy.generateSecret();
  // const curUser = await User.findByIdAndUpdate(userId, {
  //   twoFactorAuthSecret: secret.base32,
  // });
  const curUser = await User.findById(req.user.id);
  if (curUser.isTwoFa)
    return next(new AppError("This user has activated 2fa prev!", 400));
  curUser.twoFactorAuthSecret = secret.base32;
  // curUser.isTwoFa = true;
  await curUser.save({ validateBeforeSave: false });
  const url = speakeasy.otpauthURL({
    secret: secret.base32,
    label: req.user.name,
  });
  qrCode.toDataURL(url, function (err, url) {
    if (err) return next(new AppError(err, 400));
    res.status(200).json({
      status: "success",
      qrCodeUrl: url,
      hash: secret.base32,
    });
    // .json("activeTwoFa", { qrCodeURL: url, hashCode: secret.base32 });
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find({ id: { $ne: req.user.id } });
  res.status(200).json({
    status: "success",
    results: allUsers.length,
    data: {
      users: allUsers,
    },
  });
});
exports.deactivateUser = catchAsync(async (req, res, next) => {
  console.log(req.body, req.params);
  const doc = await User.findByIdAndUpdate(req.params.id, {
    isActive: req.body.isActive,
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
