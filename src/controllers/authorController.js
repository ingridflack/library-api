import { author as authorModel } from "../models/Author.js";

class AuthorController {
  static async listAuthors(req, res, next) {
    try {
      const authorsList = await authorModel.find({});
      res.status(200).json(authorsList);
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
        res.status(404).json({ message: "Not found" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateAuthor(req, res, next) {
    try {
      const id = req.params.id;
      await authorModel.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Successfully updated" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const id = req.params.id;
      await authorModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
      next();
    }
  }
}

export default AuthorController;
