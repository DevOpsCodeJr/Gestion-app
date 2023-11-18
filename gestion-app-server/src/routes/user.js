import express from "express";
import auth from "../middlewares/auth.js";
import { register, login, update } from "../controllers/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", auth, update);

export default router;
