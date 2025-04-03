const Joi = require('joi');
const { Compra, Cliente, Producto } = require('../baseDatos');

const validadorCompra = Joi.object({
    clienteCedula: Joi.string().min(8).max(12).required().messages({
      'string.base': 'La cédula debe ser un texto.',
      'string.empty': 'La cédula es obligatoria.',
      'string.min': 'La cédula debe tener al menos {#limit} caracteres.',
      'string.max': 'La cédula no puede tener más de {#limit} caracteres.',
      'any.required': 'La cédula es un campo obligatorio.'
    }),
    productoId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del producto debe ser un número.',
      'number.integer': 'El ID del producto debe ser un número entero.',
      'number.positive': 'El ID del producto debe ser un número positivo.',
      'any.required': 'El ID del producto es un campo obligatorio.'
    }),
    cantidad: Joi.number().integer().positive().required().messages({
      'number.base': 'La cantidad debe ser un número.',
      'number.integer': 'La cantidad debe ser un número entero.',
      'number.positive': 'La cantidad debe ser mayor a 0.',
      'any.required': 'La cantidad es un campo obligatorio.'
    }),
   
    fecha: Joi.date().iso().required().messages({
      'date.base': 'La fecha debe ser una fecha válida.',
      'any.required': 'La fecha es un campo obligatorio.'
    })
});

const registrarCompra = async (req, res) => {
    try {
      // Validar datos de entrada con Joi
      const { error } = validadorCompra.validate(req.body, { abortEarly: false });
  
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            clienteCedula: '',
            productoId: '',
            cantidad: '',
            total: '',
            fecha: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      const { clienteCedula, productoId, cantidad, fecha } = req.body;
  
      // Verificar si el cliente existe
      const cliente = await Cliente.findByPk(clienteCedula);
      if (!cliente) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });
      }
  
      // Verificar si el producto existe
      const producto = await Producto.findByPk(productoId);
      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado', resultado: null });
      }
      // Calcular el total
      const total = producto.precio * cantidad;

  
      // Crear la compra
      const nuevaCompra = await Compra.create({ clienteCedula, productoId, cantidad, total, fecha });
  
      res.status(201).json({
        mensaje: 'Compra registrada',
        resultado: {
          id: nuevaCompra.id,
          clienteCedula: nuevaCompra.clienteCedula,
          productoId: nuevaCompra.productoId,
          cantidad: nuevaCompra.cantidad,
          total: nuevaCompra.total,
          fecha: nuevaCompra.fecha,
          erroresValidacion: ''
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const listarCompras = async (req, res) => {
    try {
      const compras = await Compra.findAll({
        include: [
          {
            model: Cliente,
            attributes: ['cedula', 'nombre', 'email']
          },
          {
            model: Producto,
            attributes: ['id', 'nombre', 'precio']
          }
        ]
      });
  
      res.status(200).json({ mensaje: 'Compras listadas', resultado: compras });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const obtenerCompra = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar la compra por ID e incluir datos del cliente y producto
      const compra = await Compra.findByPk(id, {
        include: [
          {
            model: Cliente,
            attributes: ['cedula', 'nombre', 'email']
          },
          {
            model: Producto,
            attributes: ['id', 'nombre', 'precio']
          }
        ]
      });
  
      if (!compra) {
        return res.status(404).json({ mensaje: 'Compra no encontrada', resultado: null });
      }
  
      res.status(200).json({ mensaje: 'Compra encontrada', resultado: compra });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const obtenerComprasCliente = async (req, res) => {
    try {
      const { cedula } = req.params;
  
      // Verificar si el cliente existe
      const cliente = await Cliente.findByPk(cedula);
      if (!cliente) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });
      }
  
      // Buscar compras del cliente
      const compras = await Compra.findAll({
        where: { clienteCedula: cedula },
        include: [
          {
            model: Producto,
            attributes: ['id', 'nombre', 'precio']
          }
        ]
      });
  
      if (compras.length === 0) {
        return res.status(404).json({ mensaje: 'El cliente no tiene compras registradas', resultado: [] });
      }
  
      res.status(200).json({ mensaje: 'Compras del cliente listadas', resultado: compras });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

module.exports = {
    registrarCompra,
    listarCompras,
    obtenerCompra,
    obtenerComprasCliente
};