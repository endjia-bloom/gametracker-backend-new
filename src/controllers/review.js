const Review = require("../models/review");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("juegoId", "titulo imagenPortada");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener reviews" });
  }
};

exports.getReviewsByGame = async (req, res) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener reviews del juego" });
  }
};

exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("ERROR DETALLADO:", err);   // <-- aquí mostramos el error en consola
    res.status(400).json({ message: "Error al crear review", error: err.message });
  }
};


exports.updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Review no encontrada" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar review" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Review no encontrada" });
    res.json({ message: "Review eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar review" });
  }
};
