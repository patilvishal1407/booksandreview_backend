const express = require('express');
const router = express.Router();
const { modifyReview, removeReview } = require('../controllers/reviewController');
const authenticateToken = require('../middleware/auth');

router.put('/:id', authenticateToken, modifyReview);
router.delete('/:id', authenticateToken, removeReview);

module.exports = router;