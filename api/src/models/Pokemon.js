const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      hp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attack: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      defense: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      speed: {
        type: DataTypes.STRING,
      },
      height: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.STRING,
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
