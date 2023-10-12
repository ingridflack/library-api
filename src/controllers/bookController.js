import book from "../models/Book.js";
import bookModel from "../models/Book.js";
import { author } from "../models/Author.js";

class BookController {
  static async listBooks(req, res) {
    try {
      const bookList = await bookModel.find({});
      res.status(200).json(bookList);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Failed` });
    }
  }

  static async registerBook(req, res) {
    const newBook = req.body;
    try {
      const findAuthor = await author.findById(newBook.author);

      const completedBook = { ...newBook, author: { ...findAuthor._doc } };

      const createdBook = await book.create(completedBook);
      res
        .status(201)
        .json({ message: "Successfully registered", book: createdBook });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Registered Failed` });
    }
  }

  static async getBook(req, res) {
    try {
      const id = req.params.id;
      const book = await bookModel.findById(id);
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Failed` });
    }
  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id;
      await bookModel.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Successfully updated" });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Failed` });
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;
      await bookModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Failed` });
    }
  }

  static async getBookByPublishingCompany(req, res) {
    const publishing_company = req.query.publisher;
    try {
      const booksByPublisher = await bookModel.find({ publishing_company });

      res.status(200).json(booksByPublisher);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Failed` });
    }
  }
}

export default BookController;
