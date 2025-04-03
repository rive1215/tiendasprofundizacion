const Joi = require('joi');
const { Tienda } = require('../baseDatos');

const validadorTienda = Joi.object({
    nombre: Joi.string().min(3).max(100).required().messages({
      'string.base': 'El nombre debe ser un texto.',
      'string.empty': 'El nombre es obligatorio.',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
      'string.max': 'El nombre no puede tener más de {#limit} caracteres.',
      'any.required': 'El nombre es un campo obligatorio.'
    }),
    
    direccion: Joi.string().min(5).max(255).required().messages({
      'string.base': 'La dirección debe ser un texto.',
      'string.empty': 'La dirección es obligatoria.',
      'string.min': 'La dirección debe tener al menos {#limit} caracteres.',
      'string.max': 'La dirección no puede tener más de {#limit} caracteres.',
      'any.required': 'La dirección es un campo obligatorio.'
    }),
  
    telefono: Joi.string().pattern(/^\d{7,12}$/).required().messages({
      'string.base': 'El teléfono debe ser un texto.',
      'string.empty': 'El teléfono es obligatorio.',
      'string.pattern.base': 'El teléfono debe contener entre 7 y 12 dígitos numéricos.',
      'any.required': 'El teléfono es un campo obligatorio.'
    })
});

const registrarTienda = async (req, res) => {
    try {
      // Validar datos con Joi
      const { error } = validadorTienda.validate(req.body, { abortEarly: false });
  
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            nombre: '',
            direccion: '',
            telefono: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      const { nombre, direccion, telefono } = req.body;
  
      // Verificar si ya existe una tienda con la misma dirección o teléfono
      const tiendaExistente = await Tienda.findOne({
        where: { direccion }
      });
  
      if (tiendaExistente) {
        return res.status(400).json({ mensaje: 'Ya existe una tienda con esta dirección', resultado: null });
      }
  
      const telefonoExistente = await Tienda.findOne({
        where: { telefono }
      });
  
      if (telefonoExistente) {
        return res.status(400).json({ mensaje: 'Ya existe una tienda con este teléfono', resultado: null });
      }
  
      // Crear la nueva tienda
      const nuevaTienda = await Tienda.create({ nombre, direccion, telefono });
  
      res.status(201).json({
        mensaje: 'Tienda registrada exitosamente',
        resultado: {
          id: nuevaTienda.id,
          nombre: nuevaTienda.nombre,
          direccion: nuevaTienda.direccion,
          telefono: nuevaTienda.telefono,
          erroresValidacion: ''
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const listarTiendas = async (req, res) => {
    try {
      const tiendas = await Tienda.findAll();
      
      res.status(200).json({
        mensaje: 'Tiendas listadas correctamente',
        resultado: tiendas
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const obtenerTienda = async (req, res) => {
    try {
      const { id } = req.params;
      const tienda = await Tienda.findByPk(id);
  
      if (!tienda) {
        return res.status(404).json({
          mensaje: 'Tienda no encontrada',
          resultado: null
        });
      }
  
      res.status(200).json({
        mensaje: 'Tienda encontrada',
        resultado: tienda
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const actualizarTienda = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, direccion, telefono } = req.body;
  
      // Validar los datos con Joi
      const { error } = validadorTienda.validate(req.body, { abortEarly: false });
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            nombre: '',
            direccion: '',
            telefono: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      // Buscar la tienda
      const tienda = await Tienda.findByPk(id);
      if (!tienda) {
        return res.status(404).json({ mensaje: 'Tienda no encontrada', resultado: null });
      }
  
      // Actualizar la tienda
      await tienda.update({ nombre, direccion, telefono });
  
      res.status(200).json({
        mensaje: 'Tienda actualizada',
        resultado: tienda
      });
  
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const borrarTienda = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar la tienda
      const tienda = await Tienda.findByPk(id);
      if (!tienda) {
        return res.status(404).json({ mensaje: 'Tienda no encontrada', resultado: null });
      }
  
      // Eliminar la tienda
      await tienda.destroy();
  
      res.status(200).json({ mensaje: 'Tienda eliminada', resultado: null });
  
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

module.exports = {
    registrarTienda,
    listarTiendas,
    obtenerTienda,
    actualizarTienda,
    borrarTienda
};
  


  