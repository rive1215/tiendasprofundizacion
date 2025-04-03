const defineClientexTienda = (sequelize, DataTypes) => {
    return sequelize.define('ClientexTienda', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tiendaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tienda',
                key: 'id'
            }
        },
        clienteCedula: {
            type :DataTypes.STRING,
            references: {
                model: 'cliente',
                key: 'cedula'
            }
        } 
    }, {
        tableName: 'clientextienda',
        timestamps: true,
    });
};

module.exports = defineClientexTienda;