const mongoose = require("mongoose");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب على الكتاب ان يحتوي على عنوان!"],
    trim: true,
  },
  section: String,
  visibilty: {
    type: String,
    required: [true, "يرجى أختيار نوع الكتاب!"],
  },

  type: {
    type: String,
    required: ["true", "A document must have a type"],
    default: "pdf",
  },
  files: {
    type: [String],
    required: [true, "يرجى أضافة صور الكتاب!"],
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
  forUser: {
    type: String,
    required: [true, "A book must belong to Emp."],
  },
  number: {
    type: String,
    required: [true, "A book must have a number!"],
  },
  date: {
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

//runs before the document was saved
// bookSchema.pre("save", async function () {
//   try {
//     const filePath = `../frontend/public/pp//${this.photo}`;
//     let readFileSync = fs.readFileSync(filePath);
//     let pdfExtract = await pdfParse(readFileSync);

//     this.pdfUrl = `http://127.0.0.1:5173/pp/${this.photo}`;

//     this.test = pdfExtract.text;
//   } catch (err) {
//     console.error(err);
//   }
// });
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
bookSchema.index({
  name: "text",
});
// bookSchema.index({
//   name: "text",
//   number: "text",
// });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
