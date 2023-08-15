const mongoose = require("mongoose");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "يجب على الكتاب ان يحتوي على عنوان!"],
    trim: true,
  },
  section: String,
  type: {
    type: String,
    required: [true, "يرجى أختيار نوع الكتاب!"],
  },
  photo: {
    type: String,
    required: [true, "يرجى أضافة صورة الكتاب!"],
  },
  pdfUrl: String,

  isPrivate: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  notes: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A book must belong to  user"],
  },
  forEmp: {
    type: String,
    required: [true, "A book must belong to Emp."],
  },
  docNum: {
    type: String,
    required: [true, "A book must have a number!"],
  },
  docDate: {
    type: String,
    required: [true, "A book must have a date!"],
  },
  // postedBy: {
  //   // ref: 'user'
  // }
  time: {
    type: Date,
    default: Date.now(),
  },

  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  slug: String,
  test: String,
});
// bookSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     select: "name photo department",
//   });
// });
// bookSchema.pre('save', function(next) {
//   // console.log();
// })

const getPDF = async (file) => {
  let readFileSync = fs.readFileSync(file);
  try {
    let pdfExtract = await pdfParse(readFileSync);
    return pdfExtract.text;
    // console.log("File content: ", pdfExtract.text);
    // console.log("Total pages: ", pdfExtract.numpages);
    // console.log("All content: ", pdfExtract.info);
  } catch (error) {
    throw new Error(error);
  }
};
//runs before the document was saved
bookSchema.pre("save", async function () {
  try {
    const filePath = `../frontend/public/pp//${this.photo}`;
    let readFileSync = fs.readFileSync(filePath);
    let pdfExtract = await pdfParse(readFileSync);

    this.pdfUrl = `http://127.0.0.1:5173/pp/${this.photo}`;

    this.test = pdfExtract.text;
  } catch (err) {
    console.error(err);
  }
});
// bookSchema.pre(/^find/, function (next) {
// this.find({isPrivate: {$ne: true}})
//   next();
// });
bookSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v -passwordChangedAt",
  });
  next();
});
bookSchema.post("save", function () {
  console.log("[+++]", this);
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
