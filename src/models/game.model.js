const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    genero: {
      type: String,
      required: [true, 'El género es obligatorio'],
      trim: true,
      minlength: 3,
      maxlength: 50
    },

    plataforma: {
      type: String,
      required: [true, 'La plataforma es obligatoria'],
      trim: true
    },

    añoLanzamiento: {
      type: Number,
      required: [true, 'El año de lanzamiento es obligatorio'],
      min: 1970,
      max: 2050
    },

    desarrollador: {
      type: String,
      required: [true, 'El desarrollador es obligatorio'],
      trim: true
    },

    estado: {
      type: String,
      enum: ['pendiente', 'jugando', 'completado'],
      default: 'pendiente'
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },

    horasJugadas: {
      type: Number,
      min: 0,
      default: 0
    },

    portada: {
      type: String,
      trim: true,
      default: ''
    },

    descripcion: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', gameSchema);
