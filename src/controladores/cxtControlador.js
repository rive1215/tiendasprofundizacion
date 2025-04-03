const Joi = require('joi');
const { ClientexTienda, Cliente, Tienda } = require('../baseDatos');

const validadorClientexTienda = Joi.object({
    tiendaId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID de la tienda debe ser un número.',
      'number.integer': 'El ID de la tienda debe ser un número entero.',
      'number.positive': 'El ID de la tienda debe ser un número positivo.',
      'any.required': 'El ID de la tienda es obligatorio.'
    }),
    
    clienteCedula: Joi.string().min(8).max(12).required().messages({
      'string.base': 'La cédula del cliente debe ser un texto.',
      'string.empty': 'La cédula del cliente es obligatoria.',
      'string.min': 'La cédula del cliente debe tener al menos {#limit} caracteres.',
      'string.max': 'La cédula del cliente no puede tener más de {#limit} caracteres.',
      'any.required': 'La cédula del cliente es un campo obligatorio.'
    })
});

const registrarClientexTienda = async (req, res) => {
    try {
      const { error } = validadorClientexTienda.validate(req.body, { abortEarly: false });
  
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            tiendaId: '',
            clienteCedula: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      const { tiendaId, clienteCedula } = req.body;
  
      // Verificar si la tienda existe
      const tiendaExistente = await Tienda.findByPk(tiendaId);
      if (!tiendaExistente) {
        return res.status(404).json({ mensaje: 'La tienda no existe', resultado: null });
      }
  
      // Verificar si el cliente existe
      const clienteExistente = await Cliente.findByPk(clienteCedula);
      if (!clienteExistente) {
        return res.status(404).json({ mensaje: 'El cliente no existe', resultado: null });
      }
  
      // Verificar si ya está registrado en la tienda
      const relacionExistente = await ClientexTienda.findOne({ where: { tiendaId, clienteCedula } });
      if (relacionExistente) {
        return res.status(400).json({ mensaje: 'El cliente ya está registrado en esta tienda', resultado: null });
      }
  
      // Registrar la relación cliente-tienda
      const nuevaRelacion = await ClientexTienda.create({ tiendaId, clienteCedula });
  
      res.status(201).json({
        mensaje: 'Cliente registrado en la tienda',
        resultado: {
          tiendaId: nuevaRelacion.tiendaId,
          clienteCedula: nuevaRelacion.clienteCedula,
          erroresValidacion: ''
        }
      });
  
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const listarTiendasPorCliente = async (req, res) => {
  try {
      const { cedula } = req.params; // Se obtiene la cédula del cliente desde los parámetros de la URL

      const cliente = await Cliente.findByPk(cedula, {
          include: [
              {
                  model: Tienda,
                  through: { attributes: [] } // Evita que devuelva datos innecesarios de la tabla intermedia
              }
          ]
      });

      if (!cliente) {
          return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });
      }

      res.status(200).json({ mensaje: 'Tiendas obtenidas', resultado: cliente.Tiendas });
  } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
  }
};

module.exports = {
    registrarClientexTienda,
    listarTiendasPorCliente
};