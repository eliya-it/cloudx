const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const filesController = require("../controllers/filesController");
// console.log(filesController);
router.use(authController.protect);
router.post(
  "/",
  filesController.uploadFilePhoto,
  filesController.resizeFilePhoto,
  filesController.createFile
);
router.route("/").get(filesController.getAllFiles);
router.patch("/deactivateFile/:id", filesController.deactivateFile);
router
  .route("/:id")
  .get(filesController.getFile)
  .delete(filesController.deleteFile)
  .patch(filesController.updateFile);
module.exports = router;
