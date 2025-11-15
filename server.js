require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/juegos", require("./src/routes/game"));
app.use("/api/reviews", require("./src/routes/review"));

app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

// Conectar DB y levantar servidor
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
