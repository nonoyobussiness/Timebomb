import express from 'express';
import { getProfile, getMyProfile, updateProfile } from '../controllers/profileController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public route - get any user's profile
router.get('/:id', getProfile);

// Protected routes - require authentication
router.get('/me', authenticateToken, getMyProfile);
router.put('/me', authenticateToken, updateProfile);

export default router;

