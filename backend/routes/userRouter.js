const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/login", authController.login);
router.post("/verifyTwoFactorAuth", authController.verifyTwoFactorAuth);
router.post("/signup", authController.signup);
router.post("/validateToken", authController.validateToken);

router.use(authController.protect);

router.route("/active/:token").get(authController.checkActiveStatus);
router.post("/forgotPassword", authController.forgotPassword);
router
  .route("/registerTwoFactorAuth")
  .get(userController.registerTwoFactorAuth)
  .post(authController.verfiyTwoFactorStatus);

router.get("/", userController.getAllUsers);

router.patch("/deactivateUser/:id", userController.deactivateUser);
router.delete("/deleteMe", userController.deleteMe);

router.post("/resetPassword/:token", authController.resetPassword);
router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.get("/logout", authController.logout);

router.patch(
  "/updateMe",
  userController.uploadUserphoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router.patch("/updatePassword", authController.updatePassword);
router.use(authController.restrictTo("admin"));
router.route("/").post(authController.createUser);
router.patch("/status/:id", userController.updateStatus);
module.exports = router;
