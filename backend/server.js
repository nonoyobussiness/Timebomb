import express from "express";
import cors from "cors";
import { router as postRoutes } from "./routes/post.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true,
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Timebomb API' });
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Error handling middleware (must be after routes)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  console.error('Error stack:', err.stack);
  res.status(500).json({ 
    error: err.message || 'Internal server error',
    // Only show stack in development
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  
  // Warn about missing environment variables
  if (!process.env.JWT_SECRET) {
    console.warn('⚠️  WARNING: JWT_SECRET is not set. Authentication will fail!');
    console.warn('   Set JWT_SECRET in your .env file or environment variables.');
  }
});

import { pool } from "./config/db.js";

setInterval(async () => {
  const conn = await pool.getConnection();
  await conn.query(
    "UPDATE posts SET is_visible = TRUE WHERE visible_after <= NOW() AND is_visible = FALSE"
  );
  conn.release();
}, 60 * 1000); // check every minute
