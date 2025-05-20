const express = require('express');
const router = express.Router();
const { createBook, listBooks, getBookDetails } = require('../controllers/bookController');
const { submitReview } = require('../controllers/reviewController');
const authenticateToken = require('../middleware/auth');


router.post('/', authenticateToken, createBook);  
router.get('/', listBooks);
router.get('/:id', getBookDetails);
router.post('/:id/reviews', authenticateToken, submitReview);

module.exports = router;