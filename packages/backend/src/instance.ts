import { Sequelize } from "sequelize";

const connectionString: string = process.env.CONNECTION_STRING || "";
const sequelize = new Sequelize(connectionString);

export default sequelize;
