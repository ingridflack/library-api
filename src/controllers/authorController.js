import { author as authorModel } from "../models/Author.js";

class AuthorController {
  static async listAuthors(req, res) {
    try {
      const authorsList = await authorModel.find({});
      res.status(200).json(authorsList);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Failed` });
    }
  }

  static async registertAuthor(req, res) {
    try {
      const newAuthor = await authorModel.create(req.body);
      res
        .status(201)
        .json({ message: "Successfully registered", author: newAuthor });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Registered Failed` });
    }
  }

  static async getAuthor(req, res) {
    try {
      const id = req.params.id;
      const author = await authorModel.findById(id);
      res.status(200).json(author);
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Failed` });
    }
  }

  static async updatetAuthor(req, res) {
    try {
      const id = req.params.id;
      await authorModel.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Successfully updated" });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Failed` });
    }
  }

  static async deletetAuthor(req, res) {
    try {
      const id = req.params.id;
      await authorModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Failed` });
    }
  }
}

export default AuthorController;
