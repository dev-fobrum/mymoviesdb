import { DataTypes, Model } from "sequelize";
import sequelize from "../../../instance";

class Review extends Model {
  public id!: number;
  public userId!: number;
  public movieId!: number;
  public movieName!: number;
  public rating!: number;
  public opinion!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
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
    movieName: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    opinion: {
      type: DataTypes.STRING,
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
    modelName: "Review",
    tableName: "reviews",
  }
);

export default Review;
