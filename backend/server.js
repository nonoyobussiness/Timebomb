import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from './config/db.js'; // mysql2 pool

dotenv.config();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

const app = express();
app.use(cors());
app.use(express.json());

// --- auth middleware ---
const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing auth' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// --- routes ---
// Health
app.get('/api/health', (req, res) => res.json({ ok: true, now: Date.now() }));

// Register
app.post('/api/register', async (req, res) => {
  const { username, password, display_name } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  const id = uuidv4();
  const created_at = new Date();
  const password_hash = bcrypt.hashSync(password, 10);

  try {
    await pool.query(
      'INSERT INTO users (id, username, password_hash, display_name, created_at) VALUES (?, ?, ?, ?, ?)',
      [id, username, password_hash, display_name || null, created_at]
    );
    const token = jwt.sign({ id, username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ id, username, display_name, token });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'username taken' });
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  try {
    const [rows] = await pool.query(
      'SELECT id, username, password_hash, display_name FROM users WHERE username = ?',
      [username]
    );
    const user = rows[0];
    if (!user || !bcrypt.compareSync(password, user.password_hash))
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ id: user.id, username: user.username, display_name: user.display_name, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// TODO: rewrite /api/posts and others using MySQL

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
