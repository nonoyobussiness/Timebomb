// backend/db-init.js
import Database from 'better-sqlite3';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const DB_FILE = process.env.DB_FILE || './timebomb.sqlite';

// delete existing DB (optional, for fresh start)
if (fs.existsSync(DB_FILE)) {
  fs.unlinkSync(DB_FILE);
  console.log('Deleted existing DB file.');
}

const db = new Database(DB_FILE);

// create tables
db.exec(`
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  author_id TEXT,
  content TEXT NOT NULL,
  media_url TEXT,
  created_at INTEGER NOT NULL,
  unlock_at INTEGER NOT NULL,
  is_anonymous INTEGER DEFAULT 0,
  FOREIGN KEY(author_id) REFERENCES users(id)
);
`);

console.log('Database and tables created successfully.');
db.close();
