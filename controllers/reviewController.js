const { addReview, updateReview, deleteReview, hasUserReviewed } = require('../models/reviewModel');

const submitReview = async (req, res) => {
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const alreadyReviewed = await hasUserReviewed(userId, bookId);

    if (alreadyReviewed) {
        return res.status(400).json({ message: 'You already reviewed this book' });
    }

    const review = await addReview(userId, bookId, rating, comment);
    res.status(201).json(review);
};

const modifyReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const review = await updateReview(id, userId, rating, comment);
    if (!review) {
        return res.status(404).json({ message: 'Review not found or not yours' })
    }
    res.json(review);
};

const removeReview = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    await deleteReview(id, userId);
    res.status(204).send();
};

module.exports = { submitReview, modifyReview, removeReview };