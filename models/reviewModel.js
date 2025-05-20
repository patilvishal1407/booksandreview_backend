const { pool } = require('../config/db');

const addReview = async (userId, bookId, rating, comment) => {
    const result = await pool.query(
        'INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, bookId, rating, comment]
    );
    return result.rows[0];
};

const getReviewsByBook = async (bookId, offset, limit) => {
    const result = await pool.query(
        'SELECT * FROM reviews WHERE book_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
        [bookId, limit, offset]
    );
    return result.rows;
};

const updateReview = async (reviewId, userId, rating, comment) => {
    const result = await pool.query(
        'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
        [rating, comment, reviewId, userId]
    );
    return result.rows[0];
};

const deleteReview = async (reviewId, userId) => {
    await pool.query('DELETE FROM reviews WHERE id = $1 AND user_id = $2', [reviewId, userId]);
};

const hasUserReviewed = async (userId, bookId) => {
    const result = await pool.query(
        'SELECT * FROM reviews WHERE user_id = $1 AND book_id = $2',
        [userId, bookId]
    );
    return result.rows.length > 0;
};

module.exports = {
    addReview,
    getReviewsByBook,
    updateReview,
    deleteReview,
    hasUserReviewed
};