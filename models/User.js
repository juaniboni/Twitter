const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value) {
            // Hash the password before saving it to the database
            const hashedPassword = bcrypt.hashSync(value, 10); // You can adjust the cost factor (10 in this case)
            this.setDataValue('password', hashedPassword);
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        bio: {
          type: DataTypes.TEXT,
        },
        profilePic: {
          type: DataTypes.STRING, // URL
        },

        //  tweets: {
        //    type: DataTypes.ARRAY(DataTypes.TEXT), // If storing tweet content directly in the user model
        //  }
      },
      {
        sequelize,
        modelName: "user", // Nombre del modelo en singular y en minúscula.
      },
    );
    return User;
  }
}

module.exports = User;
