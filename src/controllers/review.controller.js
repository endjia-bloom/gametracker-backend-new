const mongoose = require('mongoose');
const Review = require('../models/Review.model');

// Obtener todas las reseñas
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('juego', 'titulo genero');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas', error: error.message });
  }
};

// Obtener reseñas por ID de juego
const getReviewsByGameId = async (req, res) => {
  try {
    const { juegoId } = req.params;
    if (!mongoose.isValidObjectId(juegoId)) return res.status(400).json({ message: 'ID inválido' });

    const reviews = await Review.find({ juego: juegoId }).populate('juego', 'titulo');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reseñas del juego', error: error.message });
  }
};

// Crear reseña
const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear reseña', error: error.message });
  }
};

// Actualizar reseña
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'ID inválido' });

    const updated = await Review.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Reseña no encontrada' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reseña', error: error.message });
  }
};

// Eliminar reseña
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'ID inválido' });

    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Reseña no encontrada' });

    res.status(200).json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
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
