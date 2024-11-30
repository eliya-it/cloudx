const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يرجى ادخال أسم المستخدم"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "يرجى ادخال عنوان البريد الألكتروني للمستخدم"],
    unique: true,
    trim: true,
  },

  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: [true, "يرجى ادخال كلمة السر!"],
    minLength: 8,
    select: false,
  },
  type: {
    type: String,
    default: "individual",
  },
  confirmPassword: {
    type: String,
    required: [true, "يرجى تأكيد كلمة السر!"],
    minLength: 8,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "عذراَ, كلمة السر غير مطابقة!",
    },
  },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  photo: {
    type: String,
    default: "user.png",
  },
  isTwoSteps: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    required: [true, "A user must have a username"],
  },
  freeTrial: {
    type: Date,
    default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
  twoFactorAuthSecret: {
    type: String,
    select: false,
  },
  activeToken: String,
  photoUrl: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  sendTwoFactorRequestToken: String,
  passwordChangedAt: Date,
  activeFor: {
    type: Date,
    // default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31 * 12),
    default: new Date(Date.now() + 1000 * 60),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 13);
  this.confirmPassword = undefined;
  next();
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// userSchema.pre("save", async function (next) {
//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });
userSchema.methods.correctPassword = async function (
  canidatePassword,
  userPassword
) {
  return await bcrypt.compare(canidatePassword, userPassword);
};
userSchema.methods.createPasswordRestToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
userSchema.pre(/^find/, function () {
  this.populate({
    path: "addedBy",
    select: "name email",
  });
});
const User = mongoose.model("User", userSchema);

module.exports = User;
