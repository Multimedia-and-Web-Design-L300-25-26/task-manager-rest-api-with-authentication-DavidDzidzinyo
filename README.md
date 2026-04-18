# Task Manager REST API

A REST API built with Node.js, Express, MongoDB, and JWT authentication.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

## Run

- Development:
  ```bash
  npm run dev
  ```
- Production:
  ```bash
  npm start
  ```

## Tests

```bash
npm test
```

## API Endpoints

### Auth

- `POST /api/auth/register`
  - Register a new user
- `POST /api/auth/login`
  - Login and receive JWT

### Tasks (Protected)

Use header: `Authorization: Bearer <token>`

- `POST /api/tasks`
  - Create task for authenticated user
- `GET /api/tasks`
  - Get authenticated user's tasks
- `DELETE /api/tasks/:id`
  - Delete only if authenticated user owns the task

## Project Structure

```text
src/
  controllers/
    authController.js
    taskController.js
  middleware/
    authMiddleware.js
  models/
    User.js
    Task.js
  routes/
    authRoutes.js
    taskRoutes.js
  config/
    db.js
  utils/
    generateToken.js
  app.js
  server.js
tests/
.env.example
.gitignore
package.json
README.md
```
