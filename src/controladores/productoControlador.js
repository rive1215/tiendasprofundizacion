const Joi = require('joi');
const { Producto, Tienda } = require('../baseDatos');

const validadorProducto = Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
      'string.base': 'El nombre debe ser un texto.',
      'string.empty': 'El nombre es obligatorio.',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
      'string.max': 'El nombre no puede tener más de {#limit} caracteres.',
      'any.required': 'El nombre es un campo obligatorio.'
    }),
    descripcion: Joi.string().min(5).max(500).required().messages({
      'string.base': 'La descripción debe ser un texto.',
      'string.empty': 'La descripción es obligatoria.',
      'string.min': 'La descripción debe tener al menos {#limit} caracteres.',
      'string.max': 'La descripción no puede tener más de {#limit} caracteres.',
      'any.required': 'La descripción es un campo obligatorio.'
    }),
    precio: Joi.number().integer().min(1).required().messages({
      'number.base': 'El precio debe ser un número.',
      'number.integer': 'El precio debe ser un número entero.',
      'number.min': 'El precio debe ser al menos {#limit}.',
      'any.required': 'El precio es un campo obligatorio.'
    }),
    stock: Joi.number().integer().min(0).required().messages({
      'number.base': 'El stock debe ser un número.',
      'number.integer': 'El stock debe ser un número entero.',
      'number.min': 'El stock no puede ser negativo.',
      'any.required': 'El stock es un campo obligatorio.'
    }),
    tiendaId: Joi.number().integer().min(1).required().messages({
      'number.base': 'El ID de la tienda debe ser un número.',
      'number.integer': 'El ID de la tienda debe ser un número entero.',
      'number.min': 'El ID de la tienda debe ser al menos {#limit}.',
      'any.required': 'El ID de la tienda es un campo obligatorio.'
    })
});

const registrarProducto = async (req, res) => {
    try {
      const { error } = validadorProducto.validate(req.body, { abortEarly: false });
  
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            tiendaId: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      const { nombre, descripcion, precio, stock, tiendaId } = req.body;
  
      // Verificar si la tienda con el id proporcionado existe
      const tiendaExistente = await Tienda.findByPk(tiendaId);
  
      if (!tiendaExistente) {
        return res.status(400).json({
          mensaje: 'La tienda con el ID proporcionado no existe.',
          resultado: null
        });
      }
  
      // Crear el nuevo producto
      const nuevoProducto = await Producto.create({ nombre, descripcion, precio, stock, tiendaId });
  
      res.status(201).json({
        mensaje: 'Producto creado exitosamente',
        resultado: {
          id: nuevoProducto.id,
          nombre: nuevoProducto.nombre,
          descripcion: nuevoProducto.descripcion,
          precio: nuevoProducto.precio,
          stock: nuevoProducto.stock,
          tiendaId: nuevoProducto.tiendaId,
          erroresValidacion: ''
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const listarProductos = async (req, res) => {
    try {
      // Obtener todos los productos
      const productos = await Producto.findAll();
  
      res.status(200).json({
        mensaje: 'Productos listados correctamente',
        resultado: productos
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const obtenerProducto = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar el producto por ID
      const producto = await Producto.findByPk(id);
  
      if (!producto) {
        return res.status(404).json({
          mensaje: 'Producto no encontrado',
          resultado: null
        });
      }
  
      res.status(200).json({
        mensaje: 'Producto encontrado',
        resultado: producto
      });
  
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const actualizarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, stock, tiendaId } = req.body;
  
      // Buscar el producto por ID
      const producto = await Producto.findByPk(id);
  
      if (!producto) {
        return res.status(404).json({
          mensaje: 'Producto no encontrado',
          resultado: null
        });
      }
  
      // Si se proporciona tiendaId, verificar que la tienda exista
      if (tiendaId) {
        const tiendaExistente = await Tienda.findByPk(tiendaId);
        if (!tiendaExistente) {
          return res.status(400).json({
            mensaje: 'La tienda especificada no existe',
            resultado: null
          });
        }
      }
  
      // Actualizar el producto
      await producto.update({ nombre, descripcion, precio, stock, tiendaId });
  
      res.status(200).json({
        mensaje: 'Producto actualizado correctamente',
        resultado: producto
      });
  
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const borrarProducto = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar el producto por ID
      const producto = await Producto.findByPk(id);
  
      if (!producto) {
        return res.status(404).json({
          mensaje: 'Producto no encontrado',
          resultado: null
        });
      }
  
      // Eliminar el producto
      await producto.destroy();
  
      res.status(200).json({
        mensaje: 'Producto eliminado correctamente',
        resultado: { id }
      });
  
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

module.exports = {
    registrarProducto,
    listarProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
};
  
  