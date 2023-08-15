const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const bookController = require("../controllers/bookController");
// console.log(bookController);
router.use(authController.protect);
router.post(
  "/",
  bookController.uploadBookPhoto,
  bookController.resizeBookPhoto,
  bookController.createBook
);
router.route("/").get(bookController.getAllBooks);
router.patch("/deactivateBook/:id", bookController.deactivateBook);
router
  .route("/:id")
  .get(bookController.getBook)
  .delete(bookController.deleteBook)
  .patch(bookController.updateBook);
module.exports = router;
