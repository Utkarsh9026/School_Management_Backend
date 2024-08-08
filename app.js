import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./database.js";
import { fileURLToPath } from "url";
import { studentRoutes } from "./routes/student.router.js";
import fs from "fs";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "controllers", "uploads"))
);

app.get("/image/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    console.log(filename);
    const fileName = path.join(__dirname, `controllers/uploads`, filename);

    if (fs.existsSync(fileName)) {
      res.sendFile(fileName);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/api/v1", studentRoutes);
app.get("/", (req, res) => {
  return res.send("hello i am server");
});

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
