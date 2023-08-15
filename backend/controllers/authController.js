const { hash } = require("bcryptjs");
const User = require("../modules/userModule");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const crypto = require("crypto");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { ifError } = require("assert");
const speakeasy = require("speakeasy");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOpts = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOpts);
  res.status(statusCode).json({
    status: "success",
    token,
    userId: user.id,
    role: user.role,
    name: user.name,
    isTwoFa: user.isTwoFa,
  });
};
exports.addUser = catchAsync(async (req, res, next) => {
  const activeToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(activeToken)
    .digest("hex");
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    department: req.body.department,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    activeToken: hashedToken,
  });
  console.log(user);
  const activeURL = `http://127.0.0.1:3000/api/v1/users/active/${hashedToken}`;
  console.log(activeURL);
  user.password = undefined;
  // Send an emailConfirm to user email to set isActive to true 😉
  res.status(201).json({
    status: "success",
    message: "user created successfully!",
    user,
  });
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.redirect("/");
};
exports.checkActiveStatus = catchAsync(async (req, res, next) => {
  const activeToken = req.params.token;
  if (!activeToken)
    return next(new AppError("Please provide a valid token!", 400));
  const curActiveUser = await User.findOne({ activeToken });
  if (!curActiveUser)
    return next(new AppError("There is no user with this token!", 404));
  curActiveUser.isActive = true;
  curActiveUser.passwordConfirm = undefined;
  curActiveUser.activeToken = undefined;
  await curActiveUser.save({ validateBeforeSave: false });
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("Please provide email", 400));
  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError("There is no user with this email!", 400));
  const resetToken = await user.createPasswordRestToken();
  console.log(resetToken);
  await user.save({ validateBeforeSave: false });
  const message = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  console.log(message);
  res.status(200).json({
    status: "success",
    message: "Token sent to your email!",
  });
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(`Token is: ${hashedToken}`);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError("Token is invalid or has expired!", 400));
  const { password, passwordConfirm } = req.body;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();
  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return next(
      new AppError("You are not logge in! Please login to have access.", 403)
    );
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const curUser = await User.findById(decoded.id);
  if (!curUser)
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  if (curUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }
  req.user = curUser;

  next();
  // console.log(decoded, user);
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.user.id);
  const user = await User.findById(req.user.id).select("+password");
  const { curPassword, newPassword, newPasswordConfirm } = req.body;
  console.log(req.body);
  if (!curPassword)
    return next(new AppError("Please provide your current password!", 400));
  if (!newPassword)
    return next(new AppError("Please provide your new password!", 400));
  if (!newPasswordConfirm)
    return next(new AppError("Please confirm your new password!", 400));
  if (!(await user.correctPassword(curPassword, user.password)))
    return next(new AppError("Incorrect password! Please try again"));
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();
  createSendToken(user, 200, req, res);
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don not have permission to perform this action", 403)
      );
    }
    next();
  };
};
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return next(new AppError("Please provide an email!", 400));
  if (!password) return next(new AppError("Please provide an password!", 400));
  const curUser = await User.findOne({ email }).select("+password");

  if (!curUser || !(await curUser.correctPassword(password, curUser.password)))
    return next(new AppError(`Incorrect email or password!`, 401));
  // if (!curUser.isActive)
  //   return next(
  //     new AppError(
  //       `Your account is not activated, Please activate it and try again!`,
  //       400
  //     )
  //   );
  // if (curUser.isTwoFa) {
  //   return res.status(200).render("twoFactorAuthLogin");
  // }
  if (curUser.isTwoFa) {
    const randomToken = crypto.randomBytes(32).toString("hex");

    const sendAuthToken = crypto
      .createHash("sha256")
      .update(randomToken)
      .digest("hex");
    console.log(sendAuthToken);
    curUser.sendTwoFactorRequestToken = sendAuthToken;
    await curUser.save({ validateBeforeSave: false });
    return res.status(200).json({
      status: "pending",
      message:
        "Logged in successfully, now you need to verify your two factor authntication!",
      sendTwoFactorRequestToken: sendAuthToken,
      isTwoFa: true,
    });
  }
  createSendToken(curUser, 200, req, res);
});
exports.verifyTwoFactorAuth = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const curUser = await User.findOne({
    sendTwoFactorRequestToken: req.body.accessToken,
  }).select("+twoFactorAuthSecret");
  console.log(curUser);
  const otpToken = curUser.twoFactorAuthSecret;
  const { otp } = req.body;

  const token =
    speakeasy.totp({
      secret: otpToken,
    }) * 1;
  console.log(otp, token);
  if (token !== otp * 1)
    return res.status(400).json({
      status: "fail",
      message: "Verification faild. Please try again!",
    });
  curUser.sendTwoFactorRequestToken = undefined;
  await curUser.save({
    validateBeforeSave: false,
  });
  createSendToken(curUser, 200, req, res);
});
exports.verfiyTwoFactorStatus = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const curUser = await User.findOne({
    sendTwoFactorRequestToken: req.body.accessToken,
  }).select("+twoFactorAuthSecret");
  const otpToken = curUser.twoFactorAuthSecret;
  const { otp } = req.body;

  const token =
    speakeasy.totp({
      secret: otpToken,
    }) * 1;
  console.log(otp, token);
  if (token !== otp * 1)
    return res.status(400).json({
      status: "fail",
      message: "Verification faild. Please try again!",
    });
  curUser.sendTwoFactorRequestToken = undefined;
  curUser.isTwoFa = true;
  await curUser.save({
    validateBeforeSave: false,
  });
  createSendToken(curUser, 200, req, res);
});
