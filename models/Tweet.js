const { Model, DataTypes } = require("sequelize");

class Tweet extends Model {
  static initModel(sequelize) {
    Tweet.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },
      // dateCreated: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW,
      // },
      // authorId: {
      //   type: DataTypes.INTEGER,
      //   // references: {
      //   //   model: 'User',
      //   //   key: 'id',
      //   // },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
      {
        sequelize,
        modelName: "tweet", // Nombre del modelo en singular y en minúscula.
      },
    );

    return Tweet;
  }
}

module.exports = Tweet;
