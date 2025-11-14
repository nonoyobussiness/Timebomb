// Migration: Create users table
// Run this to create the users table in the database

import { pool } from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
  const conn = await pool.getConnection();
  try {
    // Check if table already exists
    const tables = await conn.query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users'
    `, [process.env.DB_NAME || 'timebomb']);
    
    if (tables && tables.length > 0) {
      console.log('✓ users table already exists');
    } else {
      // Create users table
      await conn.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          display_name VARCHAR(100) DEFAULT NULL,
          bio TEXT DEFAULT NULL,
          avatar_url VARCHAR(500) DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_email (email),
          INDEX idx_username (username)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✓ Created users table');
    }
    
    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
    throw err;
  } finally {
    conn.release();
    await pool.end();
  }
}

migrate().catch(console.error);

