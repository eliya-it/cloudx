const express = require("express");
const viewsController = require("../controllers/viewsController");
const bookController = require("../controllers/bookController");
const authController = require("../controllers/authController");
const router = express.Router();
router.route("/login").get(viewsController.login).post(authController.login);
router.get("/forgotPassword", viewsController.forgotPassword);

router
  .route("/resetPassword/:token")
  .get(viewsController.resetPassword)
  .post(authController.resetPassword);
router.get("/", authController.protect, viewsController.home);

router
  .route("/addBook")
  .get(authController.protect, viewsController.addBook)
  .post(authController.protect, bookController.createBook);
router
  .route("/addUser")
  .get(authController.restrictTo("admin"), viewsController.addUser);
router.get("/me", authController.protect, viewsController.dashboard);
router.post(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);
router.get(
  "/getAllUsers",
  authController.protect,
  authController.restrictTo("admin", "supervisor"),
  viewsController.getAllUsers
);
router
  .route("/book/:id")
  .get(authController.protect, viewsController.fullBookDetails);
router.route("/book").get(viewsController.fullBookDetails);

module.exports = router;
