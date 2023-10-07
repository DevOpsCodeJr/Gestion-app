import express from "express";
const router = express.Router();

import { testClient } from "../controllers/client.js";

router.get("/test", testClient);

export default router;
