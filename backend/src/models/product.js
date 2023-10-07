import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfEntry: {
    type: Date,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: String,
  currencyType: String,
  unitPrice: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Product", ProductSchema, "products");
