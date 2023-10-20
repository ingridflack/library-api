import express from "express";
import BookController from "../controllers/bookController.js";
import handlePagination from "../middlewares/handlePagination.js";

const routes = express.Router();

routes.get("/books", BookController.listBooks, handlePagination);
routes.get("/books/search", BookController.getBookByFilter, handlePagination);
routes.get("/books/:id", BookController.getBook);
routes.post("/books", BookController.registerBook);
routes.put("/books/:id", BookController.updateBook);
routes.delete("/books/:id", BookController.deleteBook);

export default routes;
