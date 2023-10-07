import { Schema, model } from "mongoose";

const TaskSchema = Schema({
  client: {
    type: Schema.ObjectId,
    ref: "Client",
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
