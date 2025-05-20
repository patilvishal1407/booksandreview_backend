# booksandreview_backend
# Book Review API

## 📦 Tech Stack
- Node.js + Express.js
- PostgreSQL
- JWT for authentication

## 🛠 Setup
```bash

# to install Packages
npm install   

create database

# to migrate / create Tables in database
npm run migrate   

npm start
```

## 🔐 Auth Endpoints
```bash
POST /api/auth/signup
keys : username, email,password

POST /api/auth/login
keys :email,password


```

## 📚 Book Endpoints
```bash
Method :- Get
EndPoint :-/api/books
Full Path Example :- http://localhost:3000/api/books

GET /api/books?page=1&limit=10&author=xyz&genre=abc


GET /api/books/:id

POST /api/books (auth)
keys : title, author, genre

POST /api/books/:id/reviews (auth)
keys : rating, comment

GET /api/books/search?query=term
```

## ✏️ Review Endpoints
```bash
PUT /api/reviews/:id (auth)
keys :rating, comment

DELETE /api/reviews/:id (auth)
```

## 🗂 Example `.env`
```
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/bookdb
JWT_SECRET=your-secret-key
```
