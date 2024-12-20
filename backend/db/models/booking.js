"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
        otherKey: "id",
        onDelete: "CASCADE",
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: "spotId",
        otherKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  Booking.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
        },
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Spots",
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
      scopes: {
        ownerView: {
          include: [
            {
              association: "User",
              attributes: ["id", "firstName", "lastName"],
            },
          ],
          attributes: [
            "id",
            "spotId",
            "userId",
            "startDate",
            "endDate",
            "createdAt",
            "updatedAt",
          ],
        },
        nonOwnerView: {
          attributes: ["spotId", "startDate", "endDate"],
        },
      },
    },
  );
  return Booking;
};
