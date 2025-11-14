import { findUserById, updateUserProfile } from '../models/userModel.js';

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove sensitive data
    const { password_hash, ...publicProfile } = user;
    res.json(publicProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await findUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove sensitive data
    const { password_hash, ...profile } = user;
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { display_name, bio, avatar_url } = req.body;
    
    // Validation
    if (display_name && display_name.length > 100) {
      return res.status(400).json({ message: 'Display name must be 100 characters or less' });
    }
    if (bio && bio.length > 1000) {
      return res.status(400).json({ message: 'Bio must be 1000 characters or less' });
    }
    
    const updates = {};
    if (display_name !== undefined) updates.display_name = display_name;
    if (bio !== undefined) updates.bio = bio;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;
    
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
    
    const updatedUser = await updateUserProfile(userId, updates);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove sensitive data
    const { password_hash, ...profile } = updatedUser;
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

