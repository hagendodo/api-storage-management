import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import {
  getItem,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "./api.js";
import "dotenv/config";

connectDB();

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.get("/", getItem);
app.get("/:id", getItemById);
app.post("/", createItem);
app.patch("/:id", updateItem);
app.delete("/:id", deleteItem);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is listening on http://localhost:${process.env.PORT || 3000}`
  );
});
