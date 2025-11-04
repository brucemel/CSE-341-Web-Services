// server.js
require('dotenv').config(); // ← Agregar esto AL INICIO
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000; // ← Usa variable de entorno

app.use(express.json());

// Usar variable de entorno para MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Atlas conectado exitosamente');
    })
    .catch(err => {
        console.error('❌ Error de conexión:', err.message);
    });

const db = mongoose.connection;
db.on('error', (error) => console.error('❌ Error:', error));
db.once('open', () => console.log('✅ Conectado a la base de datos'));

app.use('/', require('./routes'));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
