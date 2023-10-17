import bookModel from "../models/Book.js";
import NotFound from "../errors/NotFound.js";

class BookController {
  static async listBooks(req, res, next) {
    try {
      const bookList = await bookModel.find({});
      res.status(200).json(bookList);
    } catch (err) {
      next(err);
    }
  }

  static async registerBook(req, res, next) {
    try {
      let newBook = new bookModel(req.body);

      const completedBook = await newBook.save();

      res.status(201).send(completedBook.toJSON());
    } catch (err) {
      next(err);
    }
  }

  static async getBook(req, res, next) {
    try {
      const id = req.params.id;
      const book = await bookModel.findById(id);

      if (id !== null) {
        res.status(200).json(book);
      } else {
        next(new NotFound("Book ID not found"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateBook(req, res, next) {
    try {
      const id = req.params.id;
      await bookModel.findByIdAndUpdate(id, req.body);

      if (id !== null) {
        res.status(200).json({ message: "Successfully updated" });
      } else {
        next(new NotFound("Book ID not found"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      await bookModel.findByIdAndDelete(id);

      if (id !== null) {
        res.status(200).json({ message: "Successfully deleted" });
      } else {
        next(new NotFound("Book ID not found"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async getBookByPublishingCompany(req, res, next) {
    const publishing_company = req.query.publisher;
    try {
      const booksByPublisher = await bookModel.find({ publishing_company });

      res.status(200).json(booksByPublisher);
    } catch (err) {
      next(err);
    }
  }
}

export default BookController;
