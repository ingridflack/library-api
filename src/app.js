import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import handle404 from "./middlewares/handle404.js";

const connection = await connectDatabase();

connection.on("error", (error) => {
  console.error("Error", error);
});

connection.once("open", () => {
  console.log("Connected successfully");
});

const app = express();
routes(app);

app.use(handle404);

app.use(errorHandler);

export default app;
