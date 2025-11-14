const mongoose = require('mongoose');
const Review = require('../models/Review.model');

const validateId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return false;
  }
  return true;
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('juego', 'titulo genero portada')
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reseñas', error: error.message });
  }
};

const getReviewsByGameId = async (req, res) => {
  try {
    const { juegoId } = req.params;
    if (!validateId(juegoId, res)) return;

    const reviews = await Review.find({ juego: juegoId })
      .populate('juego', 'titulo')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reseñas del juego', error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error al crear la reseña (verifica los datos)', error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id, res)) return;

    const updated = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Reseña no encontrada' });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la reseña', error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id, res)) return;

    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Reseña no encontrada' });

    res.status(200).json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la reseña', error: error.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewsByGameId,
  createReview,
  updateReview,
  deleteReview
};

