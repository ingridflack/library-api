import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, "Book title is mandatory"] },
    publishing_company: {
      type: String,
      required: [true, "Publishing company is mandatory"],
      enum: {
        values: ["ABC", "Clássicos"],
        message: "{VALUE} is not an allowed value",
      },
    },
    price: { type: Number },
    number_of_pages: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 1 && value <= 10000;
        },
        message:
          "The number of pages must be between 1 and 10000. Value: {VALUE}",
      },
      // min: [
      //   1,
      //   "The number of pages must be between 1 and 10000. Value: {VALUE}",
      // ],
      // max: [
      //   10000,
      //   "The number of pages must be between 1 and 10000. Value: {VALUE}",
      // ],
    },
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
