# Debugging 500 Internal Server Error on Login

## Step 1: Check Backend Console Logs

When you try to login, check the backend terminal for error messages. Common errors:

### Missing JWT_SECRET
```
JWT_SECRET is not set in environment variables
```
**Fix:** Add `JWT_SECRET=your-secret-key` to `backend/.env`

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Fix:** 
- Make sure MariaDB/MySQL is running
- Check database credentials in `.env`

### Table Doesn't Exist
```
Error: Table 'timebomb.users' doesn't exist
```
**Fix:** Run database migrations or create the table manually

## Step 2: Test Backend Endpoints

### Test Health Endpoint
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"ok","message":"Server is running"}`

### Test Login Endpoint Directly
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## Step 3: Verify Environment Variables

Check `backend/.env` has:
```env
JWT_SECRET=your-secret-key-change-this
PORT=5000
FRONTEND_URL=http://localhost:8080
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=timebomb
```

## Step 4: Verify Database Setup

1. **Check if database exists:**
   ```sql
   SHOW DATABASES;
   ```

2. **Check if users table exists:**
   ```sql
   USE timebomb;
   SHOW TABLES;
   DESCRIBE users;
   ```

3. **If table doesn't exist, create it:**
   ```sql
   CREATE TABLE IF NOT EXISTS users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(100) UNIQUE NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     display_name VARCHAR(100),
     bio TEXT,
     avatar_url VARCHAR(500),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Step 5: Create a Test User

If the table exists but is empty, create a test user:
```sql
INSERT INTO users (username, email, password_hash) 
VALUES ('testuser', 'test@example.com', '$2a$10$rOzJqKqKqKqKqKqKqKqKqOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq');
```

Or use the seed script:
```bash
cd backend
node seeds/seed-users.js
```

## Common Solutions

1. **Restart backend after changing .env**
2. **Check backend terminal for specific error messages**
3. **Verify database is running and accessible**
4. **Ensure users table exists with correct schema**

