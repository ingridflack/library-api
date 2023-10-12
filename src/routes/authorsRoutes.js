import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

routes.get("/authors", AuthorController.listAuthors);
routes.get("/authors/:id", AuthorController.getAuthor);
routes.post("/authors", AuthorController.registertAuthor);
routes.put("/authors/:id", AuthorController.updatetAuthor);
routes.delete("/authors/:id", AuthorController.deletetAuthor);

export default routes;
