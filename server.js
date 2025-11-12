require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const gamesRoutes = require('./src/routes/games.routes');
const reviewsRoutes = require('./src/routes/reviews.routes');

// Ruta raíz
app.get('/', (req, res) => {
  res.send('🎮 API de GameTracker en funcionamiento correctamente!');
});

// Montar rutas
app.use('/api/juegos', gamesRoutes);
app.use('/api/reseñas', reviewsRoutes);

// Rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error en el servidor:', err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
});
