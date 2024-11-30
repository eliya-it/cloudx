const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Name"],
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
    default: "head-master",
  },
  password: {
    type: String,
    required: [true, "يرجى ادخال كلمة السر!"],
    minLength: 8,
    select: false,
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
  photo: {
    type: String,
    default: "user.png",
  },
  isTwoFa: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },

  username: {
    type: String,
    required: [true, "A user must have a username"],
  },
  twoFactorAuthSecret: {
    type: String,
    select: false,
  },
  from: {
    type: String,
    required: [true, "An admin must belongs to an org!"],
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
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
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 13);
  this.passwordConfirm = undefined;
  next();
});
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
adminSchema.pre("save", async function (next) {
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
adminSchema.methods.correctPassword = async function (
  canidatePassword,
  userPassword
) {
  return await bcrypt.compare(canidatePassword, userPassword);
};
adminSchema.methods.createPasswordRestToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
adminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
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
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
