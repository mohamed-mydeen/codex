import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool, { initDb } from "./db.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get("/api/contacts", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, phone, details, created_at FROM contacts ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error: error.message });
  }
});

app.post("/api/contacts", async (req, res) => {
  const { name, phone, details } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO contacts (name, phone, details) VALUES (?, ?, ?)",
      [name, phone, details || ""]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      phone,
      details: details || "",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact", error: error.message });
  }
});

async function startServer() {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exit(1);
  }
}

startServer();
