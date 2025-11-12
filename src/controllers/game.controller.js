const mongoose = require('mongoose');
const Game = require('../models/Game.model');

// Obtener todos los juegos
const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los juegos', error: error.message });
  }
};

// Obtener un juego por ID
const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'ID inválido' });

    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ message: 'Juego no encontrado' });

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el juego', error: error.message });
  }
};

// Crear nuevo juego
const createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el juego', error: error.message });
  }
};

// Actualizar juego
const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'ID inválido' });

    const updated = await Game.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Juego no encontrado' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el juego', error: error.message });
  }
};

// Eliminar juego
const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'ID inválido' });

    const deleted = await Game.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Juego no encontrado' });

    res.status(200).json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el juego', error: error.message });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};
