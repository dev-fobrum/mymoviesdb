import { DataTypes, Model } from "sequelize";
import sequelize from "../../../instance";

class LastSee extends Model {
  public id!: number;
  public userId!: number;
  public movieId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LastSee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    movieId: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "LastSee",
    tableName: "last_see",
  }
);

export default LastSee;
