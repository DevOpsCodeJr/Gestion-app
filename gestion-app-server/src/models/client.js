import { Schema, model } from "mongoose";

const ClientSchema = Schema({
  fullName: {
    type: String,
    required: true,
  },
  companyName: String,
  customerNumber: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  typeOfPayment: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  debt: {
    type: String,
    required: true,
  },
  debtAmount: {
    type: String,
    required: true,
    default: "0",
  },
  comments: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Client", ClientSchema, "clients");
