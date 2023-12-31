import { author as authorModel } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

class AuthorController {
  static async listAuthors(req, res, next) {
    try {
      const authorsList = authorModel.find({});

      req.result = authorsList;

      next();
    } catch (err) {
      next(err);
    }
  }

  static async registerAuthor(req, res, next) {
    try {
      const newAuthor = await authorModel.create(req.body);
      res
        .status(201)
        .json({ message: "Successfully registered", author: newAuthor });
    } catch (err) {
      next(err);
    }
  }

  static async getAuthor(req, res, next) {
    try {
      const id = req.params.id;
      const author = await authorModel.findById(id);

      if (author !== null) {
        res.status(200).json(author);
      } else {
        next(new NotFound("Author ID not found"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateAuthor(req, res, next) {
    try {
      const id = req.params.id;

      await authorModel.findByIdAndUpdate(id, req.body);
      if (id !== null) {
        res.status(200).json({ message: "Successfully updated" });
      } else {
        next(new NotFound("Author ID not found"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const id = req.params.id;
      await authorModel.findByIdAndDelete(id);

      if (id !== null) {
        res.status(200).json({ message: "Successfully deleted" });
      } else {
        next(new NotFound("Author ID not found"));
      }
    } catch (err) {
      next();
    }
  }
}

export default AuthorController;
