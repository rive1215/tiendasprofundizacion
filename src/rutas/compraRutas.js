const express = require('express');
const enrutador = express.Router();
const compraControlador = require('../controladores/compraControlador');

enrutador.post('/registrar', compraControlador.registrarCompra);
enrutador.get('/listar', compraControlador.listarCompras);
enrutador.get('/obtenercompra/:id', compraControlador.obtenerCompra);
enrutador.get('/cliente/:cedula', compraControlador.obtenerComprasCliente);

module.exports = enrutador;