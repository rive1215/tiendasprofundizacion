const express = require('express');
const enrutador = express.Router();
const clienteControlador = require('../controladores/clienteControlador');

enrutador.post('/registrar', clienteControlador.registrarCliente);
enrutador.get('/listar', clienteControlador.listarClientes);
enrutador.put('/actualizar/:cedula', clienteControlador.actualizarCliente);
enrutador.delete('/borrar/:cedula', clienteControlador.borrarCliente);
enrutador.get('/obtenercliente/:cedula', clienteControlador.obtenerCliente);

module.exports = enrutador;
