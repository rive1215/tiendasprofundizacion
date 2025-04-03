require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const clienteRutas = require('./rutas/clienteRutas');
const compraRutas = require('./rutas/compraRutas');
const cxtRutas = require('./rutas/cxtRutas');
const productoRutas = require('./rutas/productoRutas');
const tiendaRutas = require('./rutas/tiendaRutas');

app.use(express.json());
app.use(cors());

app.use('/api/cliente', clienteRutas);
app.use('/api/compra', compraRutas);
app.use('/api/clientextienda', cxtRutas);
app.use('/api/producto', productoRutas);
app.use('/api/tiendas', tiendaRutas);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})