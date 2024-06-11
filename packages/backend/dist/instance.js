"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("mssql://sa:My0wnStr0ngP4ssItsS3cr3t@127.0.0.1:1433/TestDB");
exports.default = sequelize;
