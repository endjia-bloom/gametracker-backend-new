require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/db');

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

// Rutas
const gamesRoutes = require('./src/routes/games.routes');
const reviewsRoutes = require('./src/routes/reviews.routes');

// Ruta raíz
app.get('/', (req, res) => {
  res.send('🎮 API GameTracker funcionando correctamente!');
});

// Montar rutas
app.use('/api/juegos', gamesRoutes);
app.use('/api/resenas', reviewsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('❌ Error en servidor:', err.stack || err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});
