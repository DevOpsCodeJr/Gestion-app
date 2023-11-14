import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  register,
  getAllClient,
  getClientById,
  remove,
  update,
} from "../controllers/client.js";

router.get("/", getAllClient);
router.get("/:customerNumber", getClientById);
router.post("/register", auth, register);
router.delete("/delete/:customerNumber", auth, remove);
router.put("/update/:customerNumber", auth, update);

export default router;
