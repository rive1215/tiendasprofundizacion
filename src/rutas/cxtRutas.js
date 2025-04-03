const express = require('express');
const enrutador = express.Router();
const cxtControlador = require('../controladores/cxtControlador');

enrutador.post('/registrar', cxtControlador.registrarClientexTienda);
enrutador.get('/listar/:cedula', cxtControlador.listarTiendasPorCliente);


module.exports = enrutador;