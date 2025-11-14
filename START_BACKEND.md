# Starting the Backend Server

## Quick Start

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` (if it exists)
   - Or create a `.env` file with:
     ```
     PORT=5000
     FRONTEND_URL=http://localhost:8080
     JWT_SECRET=your-secret-key-change-in-production
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=
     DB_NAME=timebomb
     ```

4. **Start the server:**
   ```bash
   # For development (with auto-reload):
   npm run dev
   
   # OR for production:
   npm start
   ```

5. **Verify it's running:**
   - You should see: `Server running on port 5000`
   - Visit: http://localhost:5000/health
   - Should return: `{"status":"ok","message":"Server is running"}`

## Troubleshooting

- **Port 5000 already in use?** Change `PORT` in `.env` to a different port (e.g., `5001`)
- **Database connection errors?** Make sure MariaDB/MySQL is running and credentials are correct
- **Module not found errors?** Run `npm install` in the backend directory

