const { pool } = require('../config/db');

const addBook = async (title, author, genre, description) => {
  const result = await pool.query(
    'INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *',
    [title, author, genre]
  );
  return result.rows[0];
};

const getBooks = async (filters, offset, limit) => {
  const conditions = [];
  const values = [];

  if (filters.author) {
    values.push(`%${filters.author}%`);
    conditions.push(`author ILIKE $${values.length}`);
  }
  if (filters.genre) {
    values.push(filters.genre);
    conditions.push(`genre = $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  values.push(limit, offset);
  const result = await pool.query(
`SELECT * FROM books ${whereClause} LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
  );
  return result.rows;
};

const getBooksCount = async ({ author, genre }) => {
  let values = [];
  let conditions = [];

  if (author) {
    values.push(`%${author}%`);
    conditions.push(`author ILIKE $${values.length}`);
  }

  if (genre) {
    values.push(`%${genre}%`);
    conditions.push(`genre ILIKE $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT COUNT(*) FROM books ${whereClause}`;

  const result = await pool.query(query, values);
  return parseInt(result.rows[0].count);
};

const getBookById = async (id) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  return result.rows[0];
};

const getAverageRating = async (bookId) => {
  const result = await pool.query('SELECT AVG(rating) FROM reviews WHERE book_id = $1', [bookId]);
  return result.rows[0].avg;
};

module.exports = { addBook, getBooks,getBooksCount, getBookById, getAverageRating };