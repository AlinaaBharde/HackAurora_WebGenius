const mongoose = require("mongoose");
const dataDatabase = mongoose.createConnection(process.env.MONGO_URL);
const todoSchema = new mongoose.Schema(
  {
    todoId: { type: String },
    title: { type: String },
    status: { type: Boolean },
  },
  { _id: false }
);

const noteSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    noteText: { type: String },
    date: { type: String },
    time: { type: String },
  },
  { _id: false }
);

const currProjectSchema = new mongoose.Schema(
  {
    id: { type: String },
    Project: {
      ProjectName: { type: String },
      priority: { type: String },
      deadline: { type: String },
    },
    done: { type: Boolean },
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  todos: {
    type: [todoSchema],
  },
  notes: {
    type: [noteSchema],
  },
  Projects: {
    type: [currProjectSchema],
  },
});

module.exports = dataDatabase.model("UserData", schema);
