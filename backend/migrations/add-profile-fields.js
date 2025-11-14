// Migration: Add profile fields to users table
// Run this to add bio and avatar_url columns to the users table

import { pool } from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
  const conn = await pool.getConnection();
  try {
    // Check if columns already exist
    const [columns] = await conn.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME IN ('bio', 'avatar_url')
    `, [process.env.DB_NAME || 'timebomb']);
    
    const existingColumns = columns.map(col => col.COLUMN_NAME);
    
    if (!existingColumns.includes('bio')) {
      await conn.query(`
        ALTER TABLE users 
        ADD COLUMN bio TEXT DEFAULT NULL
      `);
      console.log('✓ Added bio column');
    } else {
      console.log('✓ bio column already exists');
    }
    
    if (!existingColumns.includes('avatar_url')) {
      await conn.query(`
        ALTER TABLE users 
        ADD COLUMN avatar_url VARCHAR(500) DEFAULT NULL
      `);
      console.log('✓ Added avatar_url column');
    } else {
      console.log('✓ avatar_url column already exists');
    }
    
    if (!existingColumns.includes('display_name')) {
      await conn.query(`
        ALTER TABLE users 
        ADD COLUMN display_name VARCHAR(100) DEFAULT NULL
      `);
      console.log('✓ Added display_name column');
    } else {
      console.log('✓ display_name column already exists');
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

