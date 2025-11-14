import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const id = await createUser(username, email, hash);
    res.json({ message: 'User created', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  try {
    // Check JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error: JWT_SECRET missing' });
    }
    
    // Trim and normalize email (case-insensitive search)
    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);
    if (!user) {
      console.log(`Login attempt with email: "${email}" (normalized: "${normalizedEmail}")`);
      return res.status(404).json({ message: 'User not found' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    console.error('Error stack:', err.stack);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      code: err.code
    });
    res.status(500).json({ 
      error: err.message || 'Internal server error',
      // Include more details in development
      ...(process.env.NODE_ENV !== 'production' && { 
        details: err.message,
        type: err.name 
      })
    });
  }
};
