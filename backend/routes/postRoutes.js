import express from 'express';
import { addPost, fetchPosts } from '../controllers/postController.js';
const router = express.Router();

router.post('/', addPost);
router.get('/', fetchPosts);

export default router;
