import express from "express";
import path from "path";
import dotenv from "dotenv";

import connectDB from "./db/configDB.js";
import helmet from "helmet";
import morgan from "morgan";

// ? Configuring dotenv with path
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("dev"));

// * Testing Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(port, () => {
  connectDB();
  console.log("Server Started...");
});
