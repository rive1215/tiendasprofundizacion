const defineProducto = (sequelize, DataTypes) => {
    return sequelize.define('Producto', {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tiendaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tienda',
                key: 'id'
            }
        }
    }, {
        tableName: 'producto',
        timestamps: true
    });
};

module.exports = defineProducto;