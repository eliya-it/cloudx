const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/login", authController.login);
router.post("/verifyTwoFactorAuth", authController.verifyTwoFactorAuth);
router.use(authController.protect);
router.route("/active/:token").get(authController.checkActiveStatus);
router.post("/forgotPassword", authController.forgotPassword);
router
  .route("/registerTwoFactorAuth")
  .get(userController.registerTwoFactorAuth)
  .post(authController.verfiyTwoFactorStatus);

router.get("/", userController.getAllUsers);
router.post("/signup", authController.addUser);
router.get("/login", (req, res) => {
  res.status(200).json("Success");
});
router.patch("/deactivateUser/:id", userController.deactivateUser);

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

module.exports = router;
