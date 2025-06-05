const { addReview, updateReview, deleteReview, hasUserReviewed } = require('../models/reviewModel');

const submitReview = async (req, res) => {
    // console.log('req', req.user);
    // console.log('req', req.params.id);
    const  id  = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    // console.log("id", id)
    
    // console.log("rating, comment", rating, comment)

    const alreadyReviewed = await hasUserReviewed(userId, id);

    if (alreadyReviewed) {
        return res.status(400).json({ message: 'You already reviewed this book' });
    }

    const review = await addReview(userId, id, rating, comment);
    return res.status(201).json(review);
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