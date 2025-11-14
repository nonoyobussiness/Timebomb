import { pool } from '../config/db.js';

export const createUser = async (username, email, passwordHash) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, passwordHash]
    );
    // MariaDB returns insertId directly in result object
    return result.insertId || result.affectedRows;
  } finally {
    conn.release();
  }
};

export const findUserByEmail = async (email) => {
  const conn = await pool.getConnection();
  try {
    // Use LOWER() for case-insensitive email matching
    const rows = await conn.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email]);
    // MariaDB returns array directly, not wrapped in array
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (err) {
    console.error('Database error in findUserByEmail:', err);
    throw err;
  } finally {
    conn.release();
  }
};

export const findUserById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query('SELECT id, username, email, display_name, bio, avatar_url, created_at FROM users WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0];
    }
    return null;
  } finally {
    conn.release();
  }
};

export const updateUserProfile = async (id, updates) => {
  const conn = await pool.getConnection();
  try {
    const fields = [];
    const values = [];
    
    if (updates.display_name !== undefined) {
      fields.push('display_name = ?');
      values.push(updates.display_name);
    }
    if (updates.bio !== undefined) {
      fields.push('bio = ?');
      values.push(updates.bio);
    }
    if (updates.avatar_url !== undefined) {
      fields.push('avatar_url = ?');
      values.push(updates.avatar_url);
    }
    
    if (fields.length === 0) {
      return null;
    }
    
    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    await conn.query(query, values);
    
    return await findUserById(id);
  } finally {
    conn.release();
  }
};
