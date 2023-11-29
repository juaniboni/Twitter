const { Model, DataTypes } = require("sequelize");

class Like extends Model {
  static initModel(sequelize) {
    Like.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        }
    
      },
      {
        sequelize,
        modelName: "like",
        timestamps: true // Nombre del modelo en singular y en minúscula.
      },
    );

    return Like;
  }
}

module.exports = Like;