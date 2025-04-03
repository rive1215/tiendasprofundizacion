const express = require('express');
const enrutador = express.Router();
const tiendaControlador = require('../controladores/tiendaControlador');

enrutador.post('/registrar', tiendaControlador.registrarTienda);
enrutador.get('/listar', tiendaControlador.listarTiendas);
enrutador.get('/obtener/:id', tiendaControlador.obtenerTienda);
enrutador.put('/actualizar/:id', tiendaControlador.actualizarTienda);
enrutador.delete('/borrar/:id', tiendaControlador.borrarTienda);

module.exports = enrutador;