import { Schema, model } from "mongoose";

const EmployeeSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  surname: String,
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  dateOfEntry: {
    type: Date,
    required: true,
  },
  expirationOfHealthInsurance: {
    type: Date,
    required: true,
  },
  expirationDriverLicence: Date,
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model("Employee", EmployeeSchema, "employees");
