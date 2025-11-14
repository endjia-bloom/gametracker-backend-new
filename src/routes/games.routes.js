const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
} = require('../controllers/game.controller');

const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Falta el ID' });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  next();
};

router.get('/', getAllGames);
router.get('/:id', validateObjectId, getGameById);
router.post('/', createGame);
router.put('/:id', validateObjectId, updateGame);
router.delete('/:id', validateObjectId, deleteGame);

module.exports = router;

