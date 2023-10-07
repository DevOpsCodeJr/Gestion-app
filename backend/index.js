import connectDB from "./src/database/connectDB.js";
import cors from "cors";
import express from "express";

connectDB();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
import ClientRoutes from "./src/routes/client.js";
import UserRoutes from "./src/routes/user.js";

app.get("/api", (req, res) => {
  return res.status(200).json({
    State: "API is ready!",
  });
});

app.use("/api/client", ClientRoutes);
app.use("/api/user", UserRoutes);

app.listen(port, () => {
  console.log(`API is running on port: ${port}`);
});
