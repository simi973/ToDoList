import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT DB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Error:", err));

// MODEL
const ToDo = mongoose.model(
  "ToDos",
  new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  })
);

// ROUTES
// GET all todos
app.get("/ToDos", async (req, res) => {
  const todos = await ToDo.find();
  res.json(todos);
});

// CREATE todo
app.post("/ToDos", async (req, res) => {
  const todo = new ToDo(req.body);
  await todo.save();
  res.status(201).json(todo);
});

// DELETE todo by id
app.delete("/ToDos/:id", async (req, res) => {
  await ToDo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

// OPTIONAL — update todo
app.put("/ToDos/:id", async (req, res) => {
  const updated = await ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
