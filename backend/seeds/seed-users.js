// Seed file: Create sample users
import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

async function seed() {
  const conn = await pool.getConnection();
  try {
    const passwordHash = await bcrypt.hash('password', 10);
    
    // Check if demo user already exists
    const existing = await conn.query(
      'SELECT id FROM users WHERE email = ?',
      ['demo@timebomb.app']
    );
    
    if (!existing || existing.length === 0) {
      await conn.query(
        `INSERT INTO users (username, email, password_hash, display_name, bio, avatar_url) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          'demo_user',
          'demo@timebomb.app',
          passwordHash,
          'Demo User',
          'Welcome to Timebomb! This is a demo profile. You can edit your bio and display name.',
          null
        ]
      );
      console.log('✓ Created demo user (demo@timebomb.app / password)');
    } else {
      console.log('✓ Demo user already exists');
    }
    
    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Seed failed:', err);
    throw err;
  } finally {
    conn.release();
    await pool.end();
  }
}

seed().catch(console.error);

