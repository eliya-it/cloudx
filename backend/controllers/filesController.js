const File = require("../modules/filesModule");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else if (file.mimetype.startsWith("application/pdf")) {
    cb(null, true);
  } else if (file.mimetype.startsWith("application/msword")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image. Please upload only images!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadFilePhoto = upload.fields([
  {
    name: "photo",
    maxCount: 1,
  },
  {
    name: "files",
    maxCount: 6,
  },
]);
exports.resizeFilePhoto = async (req, res, next) => {
  console.log(req.files);
  // for (var i = 0; i < req.files["photos"].length; i++) {
  //   console.log(req.files["photos"][i]);
  // }
  if (!req.files)
    return next(new AppError("You must upload document files!", 400));
  req.body.files = [];
  if (req.files.files.length === 1) {
    const curFile = req.files.files[0];
    if (curFile.mimetype.startsWith("application/pdf")) {
      req.body.files.push(`document-${Math.random()}-${Date.now()}.pdf`);
      const curImage = fs.writeFileSync(
        "public/documents/" + req.body.files,
        curFile.buffer
      );
      req.body.type = "pdf";
    } else if (curFile.mimetype.startsWith("application/msword")) {
      req.body.files.push(`File-${Math.random()}-${Date.now()}.doc`);
      fs.writeFileSync("public/photos/" + req.body.files, curFile.buffer);
    }
  } else if (req.files.files.length <= 10) {
    await Promise.all(
      req.files["files"].map(async (photo, i) => {
        if (!photo.mimetype.startsWith("image"))
          return next(new AppError("This file is not supported yet!"));
        const photoName = `document-photo-${Date.now()}-${i + 1}.jpeg`;
        await sharp(photo.buffer)
          .resize(1920, 1080)
          .toFormat("jpeg")
          .jpeg({ quality: 100 })
          .toFile(`public/photos/${photoName}`);
        req.body.files.push(photoName);
      })
    );
    // Set type based on file extension
    req.body.type = "image";
  }
  // if (req.files["photo"]) {
  //   req.body.photo = `File-${Math.random()}-${Date.now()}.pdf`;
  //   const curImage = fs.writeFileSync(
  //     "public/pp/" + req.body.photo,
  //     req.files["photo"][0].buffer
  //   );
  // }
  // Process Photos
  // req.body.files = [];

  // );

  next();
};
// exports.createFile = factory.createOne(File);
exports.createFile = catchAsync(async (req, res, next) => {
  let filterdBody = {};
  if (req.user?.id)
    filterdBody = {
      ...req.body,
      user: req.user.id,
      section: req.user.department,
    };

  const doc = await File.create(filterdBody);
  res.status(201).json({
    status: "success",
    message: "Document was created successfully!",
    data: {
      doc,
    },
  });
});

exports.deleteFile = factory.deleteOne(File);
exports.updateFile = factory.updateOne(File);
exports.getFile = factory.getOne(File);
exports.getAllFiles = factory.getAll(File);
exports.deactivateFile = factory.updateOne(File);
