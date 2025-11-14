import express from "express";
import cors from "cors";
import { router as postRoutes } from "./routes/post.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import { pool } from "./config/db.js";

setInterval(async () => {
  const conn = await pool.getConnection();
  await conn.query(
    "UPDATE posts SET is_visible = TRUE WHERE visible_after <= NOW() AND is_visible = FALSE"
  );
  conn.release();
}, 60 * 1000); // check every minute
