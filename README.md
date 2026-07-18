# Library Book Inventory API

A digital Express API for managing library book inventory with real-time data tracking and comprehensive error handling.

---

## Features

- Add, update, and delete books
- Search and filter by title, author, or ISBN
- Real-time inventory tracking
- XSS protection and input validation
- Analytics logging
- Empty state handling

---

## Tech Used

Node.js, Express.js, express-validator, Helmet.js, CORS, ESLint

---

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open `http://localhost:3000` in your browser or API client.

Or use production mode:
```bash
npm start
```

> Note: API endpoints require a REST client like Postman or curl. Health check available at `GET /health`.

## Live Demo

API Endpoints:
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
