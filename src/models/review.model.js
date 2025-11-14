const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    juego: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: [true, 'La reseña debe estar asociada a un juego']
    },

    usuario: {
      type: String,
      required: [true, 'El nombre del usuario es obligatorio'],
      trim: true,
      minlength: 2,
      maxlength: 30
    },

    comentario: {
      type: String,
      required: [true, 'El comentario es obligatorio'],
      trim: true,
      minlength: 5,
      maxlength: 500
    },

    calificacion: {
      type: Number,
      required: [true, 'La calificación es obligatoria'],
      min: 1,
      max: 5
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);

