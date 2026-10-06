# Task API

A simple REST API for managing tasks, built with Express and MySQL. Deployed on Vercel as serverless functions.

## Endpoints

| Method | Path        | Description          |
| ------ | ----------- | -------------------- |
| GET    | /tasks      | List all tasks       |
| GET    | /tasks/:id  | Get a single task    |
| POST   | /tasks      | Create a task        |
| PUT    | /tasks/:id  | Update a task        |
| DELETE | /tasks/:id  | Delete a task        |

## Local development

1. Create a MySQL database and run `schema.sql`.
2. Copy `.env.example` to `.env` and fill in your credentials.
3. Run `npm install && npm start` (or `node api/index.js`).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel (Node.js preset).
3. Add environment variables: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
4. Deploy.