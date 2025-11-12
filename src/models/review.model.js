const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  juego: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  usuario: { type: String, required: true },
  comentario: { type: String, required: true },
  calificacion: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
