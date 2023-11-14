import connectDB from "./src/database/connectDB.js";
import cors from "cors";
import express from "express";

connectDB();

const app = express();
const port = 8080;

app.disable("x-powered-by");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
import ClientRoutes from "./src/routes/client.js";
import UserRoutes from "./src/routes/user.js";
import TaskRoutes from "./src/routes/task.js";

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.get("/api", (req, res) => {
  return res.status(200).json({
    State: "API is ready!",
  });
});

app.use("/api/client", ClientRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/task", TaskRoutes);

app.listen(port, () => {
  console.log(`API is running on port: ${port}`);
});
