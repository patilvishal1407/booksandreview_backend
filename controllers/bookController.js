const { addBook, getBooks, getBookById, getAverageRating ,getBooksCount} = require('../models/bookModel');
const { getReviewsByBook } = require('../models/reviewModel');

const createBook = async (req, res) => {
    const { title, author, genre } = req.body;
    const book = await addBook(title, author, genre);
    res.status(201).json(book);
};

const listBooks = async (req, res) => {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const books = await getBooks({ author, genre }, offset, parseInt(limit));
    const totalCount = await getBooksCount({ author, genre });

    const totalPages = Math.ceil(totalCount / limit);

    const response = {
        books,
        total_books: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        total_pages: totalPages,
        has_next_page: page < totalPages,
        has_prev_page: page > 1
    };

    res.json(response);
};

const getBookDetails = async (req, res) => {
    const book = await getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const averageRating = await getAverageRating(book.id);
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const reviews = await getReviewsByBook(book.id, offset, parseInt(limit));
    res.json({ ...book, averageRating, reviews });
};

module.exports = { createBook, listBooks, getBookDetails };