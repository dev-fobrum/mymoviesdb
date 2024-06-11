import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "mssql://sa:My0wnStr0ngP4ssItsS3cr3t@127.0.0.1:1433/TestDB"
);

export default sequelize;
