// import express from 'express';
// import cors from 'cors'

// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// const app=express()

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
// .then(()=>console.log("db connected"))
// .catch(()=>console.log(err))

// const Todo=mongoose.model("Todo",new mongoose.Schema({}))

// app.get('/todos',async(requestAnimationFrame,res)=>{
//     res.json(await)
// })

// // POST new todo
// app.post('/todos', async (req, res) => {
//   try {
//     const todo = new Todo(req.body);
//     await todo.save();
//     res.status(201).json(todo);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // DELETE todo by id
// app.delete('/todos/:id', async (req, res) => {
//   try {
//     const deleted = await Todo.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: "Todo not found" });
//     res.json({ message: "Todo deleted", deleted });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// Define Todo schema & model
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  })
);

// GET all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new todo
app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE todo by id
app.delete("/todos/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));