const defineCliente = (sequelize, DataTypes) => {
    return sequelize.define('Cliente', {
        cedula: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'email'
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'telefono'
        }
    }, {
        tableName: 'cliente',
        timestamps: true
    });
};

module.exports = defineCliente;