require('dotenv').config();

const { Sequelize,DataTypes } = require('sequelize');

const defineCliente = require('../modelos/cliente');
const defineClientexTienda = require('../modelos/clientexTienda');
const defineCompra = require('../modelos/compra');
const defineProducto = require('../modelos/producto');
const defineTienda = require('../modelos/tienda');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

const Cliente = defineCliente(sequelize, DataTypes);
const ClientexTienda = defineClientexTienda(sequelize, DataTypes);
const Compra = defineCompra(sequelize, DataTypes);
const Producto = defineProducto(sequelize, DataTypes);
const Tienda = defineTienda(sequelize, DataTypes);

sequelize.authenticate()
    .then(() => console.log('Conectando a la base de datos.'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));

sequelize.sync({ alter: true, force: false })
    .then(() => console.log('Sincronización completada.'))
    .catch(err => console.error('Error en la sincronización:', err));

module.exports = {
    Cliente,
    ClientexTienda,
    Compra,
    Producto,
    Tienda,
    sequelize
};

// Compra pertenece a un Cliente
Compra.belongsTo(Cliente, { foreignKey: 'clienteCedula' });

// Cliente tiene muchas Compras
Cliente.hasMany(Compra, { foreignKey: 'clienteCedula' });

// Compra pertenece a un Producto
Compra.belongsTo(Producto, { foreignKey: 'productoId' });

// Producto tiene muchas Compras
Producto.hasMany(Compra, { foreignKey: 'productoId' });

// Un Cliente puede estar en muchas Tiendas a través de ClientexTienda
Cliente.belongsToMany(Tienda, { through: ClientexTienda, foreignKey: 'clienteCedula' });

// Una Tienda puede tener muchos Clientes a través de ClientexTienda
Tienda.belongsToMany(Cliente, { through: ClientexTienda, foreignKey: 'tiendaId' });

