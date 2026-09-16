# Task API v2 — Express + PostgreSQL

A REST API for managing a to-do list using **Node.js, Express, and PostgreSQL**.

This version provides complete CRUD operations for tasks and includes Swagger UI for interactive API testing.

## Features

- Create, read, update, and delete tasks
- PostgreSQL database for persistent storage
- Input validation
- Proper HTTP status codes
- Parameterized SQL queries
- Centralized error handling
- Swagger/OpenAPI documentation

## Prerequisites

- Node.js 20+
- PostgreSQL
- VS Code

## Installation and Setup

### 1. Create the database

Open PostgreSQL and create the database:

```sql
CREATE DATABASE taskdb;
```

Connect to `taskdb` and run:

```text
db/schema.sql
```

This creates the `tasks` table and adds sample tasks.

### 2. Configure environment variables

Copy `.env.example` to `.env`:

```powershell
Copy-Item .env.example .env
```

Then edit `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskdb
```

Do **not** upload `.env` to GitHub.

### 3. Install dependencies

```powershell
npm install
```

### 4. Run the API

```powershell
npm start
```

The API will run at:

```text
http://localhost:3000
```

Swagger UI:

```text
http://localhost:3000/docs
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/docs` | Swagger UI |

## Example Requests

### Get all tasks

```powershell
curl.exe -i http://localhost:3000/tasks
```

### Get a task

```powershell
curl.exe -i http://localhost:3000/tasks/1
```

### Create a task

```powershell
curl.exe -X POST http://localhost:3000/tasks `
  -H "Content-Type: application/json" `
  -d '{"title":"Buy milk"}'
```

### Update a task

```powershell
curl.exe -X PUT http://localhost:3000/tasks/1 `
  -H "Content-Type: application/json" `
  -d '{"done":true}'
```

### Delete a task

```powershell
curl.exe -X DELETE http://localhost:3000/tasks/1
```

## Example `curl -i` Output

Run:

```powershell
curl.exe -i http://localhost:3000/health
```

Paste the actual output below:

```text
PASTE YOUR ACTUAL curl -i OUTPUT HERE
```

## Swagger UI

The API is documented using OpenAPI and can be tested interactively through Swagger UI.

Open:

```text
http://localhost:3000/docs
```

Add a screenshot of the Swagger UI below:

![Swagger UI](docs/swagger.png)

## Project Structure

```text
task-api-v2/
├── db/
│   └── schema.sql
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── app.js
│   ├── db.js
│   └── server.js
├── .env.example
├── .gitignore
├── openapi.json
├── package-lock.json
├── package.json
└── README.md
```

## Technologies

- Node.js
- Express
- PostgreSQL
- `pg`
- Swagger UI
- OpenAPI
- dotenv

## Next Version

Planned v3 features:

- User authentication
- Password hashing
- JWT authentication
- Protected routes
- User-specific tasks