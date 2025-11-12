const express = require('express');
const router = express.Router();

const {
  getAllReviews,
  getReviewsByGameId,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller');

router.get('/', getAllReviews);
router.get('/:juegoId', getReviewsByGameId);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
