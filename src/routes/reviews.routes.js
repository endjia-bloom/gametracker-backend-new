const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {
  getAllReviews,
  getReviewsByGameId,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller');

const validateObjectId = (req, res, next) => {
  const id = req.params.id || req.params.juegoId;
  if (!id) return res.status(400).json({ message: 'Falta el ID' });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  next();
};

router.get('/', getAllReviews);
router.get('/:juegoId', validateObjectId, getReviewsByGameId);
router.post('/', createReview);
router.put('/:id', validateObjectId, updateReview);
router.delete('/:id', validateObjectId, deleteReview);

module.exports = router;

