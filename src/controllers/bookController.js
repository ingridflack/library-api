import { book as bookModel } from "../models/index.js";
import { author as authorModel } from "../models/Author.js";
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

  static async getBookByFilter(req, res, next) {
    try {
      const search = await handleSearch(req.query);

      if (search !== null) {
        const booksByFilter = await bookModel.find(search).populate("author");

        res.status(200).json(booksByFilter);
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  }
}

async function handleSearch(params) {
  const { publishing_company, title, minPages, maxPages, author } = params;

  let search = {};

  // Filter by publishing_company
  if (publishing_company) search.publishing_company = publishing_company;

  // Filter by title
  if (title) search.title = { $regex: title, $options: "i" };

  // Filter by number of pages
  if (minPages || maxPages) search.number_of_pages = {};

  if (minPages) search.number_of_pages.$gte = minPages;
  if (maxPages) search.number_of_pages.$lte = maxPages;

  // Filter by author name
  if (author) {
    const authorItem = await authorModel.findOne({ name: author });

    if (authorItem !== null) {
      search.author = authorItem._id;
    } else {
      search = null;
    }
  }

  return search;
}

export default BookController;
