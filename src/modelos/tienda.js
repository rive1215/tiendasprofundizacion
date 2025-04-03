const defineTienda = (sequelize, DataTypes) => {
    return sequelize.define('Tienda', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'direccion'
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'telefono'
        }
    }, {
        tableName: 'tienda',
        timestamps: true
    });
};

module.exports = defineTienda;