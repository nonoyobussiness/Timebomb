import jwt from 'jsonwebtoken';
import { createPost, getAllPosts } from '../models/postModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const addPost = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { caption, mediaUrl, scheduledAt } = req.body;
    const postId = await createPost(decoded.id, caption, mediaUrl, scheduledAt);
    res.json({ message: 'Post created', postId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
