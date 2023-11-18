import express from "express";
import auth from "../middlewares/auth.js";
import {
  create,
  getAllTasks,
  getTaskByCustomerNumber,
  updateTaskByOrderNumber,
  deleteTask,
} from "../controllers/task.js";

const router = express.Router();

router.post("/create", auth, create);
router.get("/", getAllTasks);
router.get("/byClient/:customerNumber", getTaskByCustomerNumber);
router.put("/update/:orderNumber", auth, updateTaskByOrderNumber);
router.delete("/delete/:orderNumber", auth, deleteTask);

export default router;
