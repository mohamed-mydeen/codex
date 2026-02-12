# Contacts Website (Next.js + Node.js + MySQL2)

This project includes:
- **Frontend:** Next.js app for entering and viewing contacts.
- **Backend:** Node.js + Express API.
- **Database:** MySQL using `mysql2`.

## Project structure

- `frontend/` - Next.js UI
- `backend/` - Express API + MySQL access

## Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs by default on `http://localhost:4000`.

### API endpoints

- `GET /api/contacts` - List all contacts
- `POST /api/contacts` - Create a contact

Request body:

```json
{
  "name": "Jane Doe",
  "phone": "+1-555-0100",
  "details": "Friend from work"
}
```

## Frontend setup

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs by default on `http://localhost:3000`.

## Database notes

The backend auto-creates a `contacts` table if it does not exist.
Make sure your MySQL server is running and credentials in `backend/.env` are correct.
