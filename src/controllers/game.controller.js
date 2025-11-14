const mongoose = require('mongoose');
const Game = require('../models/Game.model');

const validateId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: 'ID inválido' });
    return false;
  }
  return true;
};

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los juegos', error: error.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id, res)) return;

    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ message: 'Juego no encontrado' });

    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el juego', error: error.message });
  }
};

const createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error al crear el juego (verifica los datos)', error: error.message });
  }
};

const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id, res)) return;

    const updated = await Game.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Juego no encontrado' });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el juego', error: error.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validateId(id, res)) return;

    const deleted = await Game.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Juego no encontrado' });

    res.status(200).json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    console.error(error);
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
