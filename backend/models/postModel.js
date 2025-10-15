import { db } from '../config/db.js';

export const createPost = async (userId, caption, mediaUrl, scheduledAt) => {
  const [result] = await db.query(
    'INSERT INTO posts (user_id, caption, media_url, scheduled_at, created_at) VALUES (?, ?, ?, ?, NOW())',
    [userId, caption, mediaUrl, scheduledAt]
  );
  return result.insertId;
};

export const getAllPosts = async () => {
  const [rows] = await db.query(
    'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC'
  );
  return rows;
};
