import express from "express";
import { pool } from "../config/db.js";

export const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
    const { user_id, title, preview, content, media_url, visibility, delay } = req.body;
    if (!content || delay === undefined) {
        return res.status(400).json({ error: "Missing content or delay" });
    }

    const visibleAfter = new Date(Date.now() + delay * 60000);


  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO posts (user_id, title, preview, content, media_url, visibility, visible_after) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user_id || 1, title, preview, content, media_url, visibility || 'public', visibleAfter]
    );
    conn.release();
    res.json({ message: "Post created", visibleAfter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// Get all visible posts
router.get("/", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM posts WHERE is_visible = TRUE");
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});
