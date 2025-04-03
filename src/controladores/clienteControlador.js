const Joi = require('joi');
const { Cliente } = require('../baseDatos');

const validadorCliente = Joi.object({
  cedula: Joi.string().min(8).max(12).required().messages({
    'string.base': 'La cédula debe ser un texto.',
    'string.empty': 'La cédula es obligatoria.',
    'string.min': 'La cédula debe tener al menos {#limit} caracteres.',
    'string.max': 'La cédula no puede tener más de {#limit} caracteres.',
    'any.required': 'La cédula es un campo obligatorio.'
  }),
  nombre: Joi.string().min(2).max(50).required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre es obligatorio.',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres.',
    'any.required': 'El nombre es un campo obligatorio.'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'El email debe ser un texto.',
    'string.empty': 'El email es obligatorio.',
    'string.email': 'El email debe ser un correo electrónico válido.',
    'any.required': 'El email es un campo obligatorio.'
  }),
  telefono: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.base': 'El teléfono debe ser un texto.',
    'string.empty': 'El teléfono es obligatorio.',
    'string.pattern.base': 'El teléfono debe tener entre 7 y 10 dígitos numéricos.',
    'any.required': 'El teléfono es un campo obligatorio.'
  })
});

const registrarCliente = async (req, res) => {
    try {
      // Validar los datos con Joi
      const { error } = validadorCliente.validate(req.body, { abortEarly: false });
  
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            cedula: '',
            email: '',
            nombre: '',
            telefono: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      // Extraer datos del cuerpo de la solicitud
      const { cedula, email, nombre, telefono } = req.body;
  
      // Verificar si el cliente ya existe
      const clienteExistente = await Cliente.findByPk(cedula);
      if (clienteExistente) {
        return res.status(400).json({ mensaje: 'El cliente ya existe', resultado: null });
      }
  
      // Crear un nuevo cliente en la base de datos
      const nuevoCliente = await Cliente.create({ cedula, email, nombre, telefono });
  
      res.status(201).json({
        mensaje: 'Cliente creado',
        resultado: {
          cedula: nuevoCliente.cedula,
          email: nuevoCliente.email,
          nombre: nuevoCliente.nombre,
          telefono: nuevoCliente.telefono,
          erroresValidacion: ''
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', resultado: null });
    }
};

const listarClientes = async (req, res) => {
    try {
      // Obtener todos los clientes de la base de datos
      const clientes = await Cliente.findAll();
  
      res.status(200).json({
        mensaje: 'Clientes listados',
        resultado: clientes
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error en el servidor',
        resultado: null
      });
    }
};

const actualizarCliente = async (req, res) => {
    try {
      const { cedula } = req.params;
      const { email, nombre, telefono } = req.body;
  
      // Buscar el cliente por su cédula (PK)
      const cliente = await Cliente.findByPk(cedula);
  
      if (!cliente) {
        return res.status(404).json({
          mensaje: 'Cliente no encontrado',
          resultado: null
        });
      }
  
      // Actualizar los datos del cliente
      await cliente.update({ email, nombre, telefono });
  
      res.status(200).json({
        mensaje: 'Cliente actualizado',
        resultado: cliente
      });
  
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error en el servidor',
        resultado: null
      });
    }
};

const borrarCliente = async (req, res) => {
    try {
      const { cedula } = req.params;
  
      // Buscar el cliente por su cédula (PK)
      const cliente = await Cliente.findByPk(cedula);
  
      if (!cliente) {
        return res.status(404).json({
          mensaje: 'Cliente no encontrado',
          resultado: null
        });
      }
  
      // Eliminar el cliente
      await cliente.destroy();
  
      res.status(200).json({
        mensaje: 'Cliente eliminado',
        resultado: null
      });
  
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error en el servidor',
        resultado: null
      });
    }
};

const obtenerCliente = async (req, res) => {
    try {
      const { cedula } = req.params;
  
      // Buscar el cliente por su cédula (PK)
      const cliente = await Cliente.findByPk(cedula);
  
      if (!cliente) {
        return res.status(404).json({
          mensaje: 'Cliente no encontrado',
          resultado: null
        });
      }
  
      res.status(200).json({
        mensaje: 'Cliente encontrado',
        resultado: cliente
      });
  
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error en el servidor',
        resultado: null
      });
    }
};

module.exports = {
    registrarCliente,
    listarClientes,
    actualizarCliente,
    borrarCliente,
    obtenerCliente
};
