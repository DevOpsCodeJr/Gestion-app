import { Schema, model } from "mongoose";

const TaskSchema = Schema({
  user: {
    name: String,
    surname: String,
  },
  client: {
    fullName: String,
    customerNumber: Number,
    address: String,
    phone: Number,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  taskDate: {
    type: Date,
    required: true,
  },
  comments: String,
  orderNumber: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Task", TaskSchema, "tasks");
