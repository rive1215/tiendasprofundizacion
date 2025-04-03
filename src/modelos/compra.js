const defineCompra = (sequelize, DataTypes) => {
    return sequelize.define('Compra', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        clienteCedula: {
            type :DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'cliente',
                key: 'cedula'
            }
        },
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'producto',
                key: 'id'
            }
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'compra',
        timestamps: true,
    });
};

module.exports = defineCompra;