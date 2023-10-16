import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, "Book title is mandatory"] },
    publishing_company: {
      type: String,
      required: [true, "Publishing company is mandatory"],
    },
    price: { type: Number },
    number_of_pages: { type: Number },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: [true, "Author is mandatory"],
    },
  },
  { versionKey: false }
);

const book = mongoose.model("books", bookSchema);

export default book;
