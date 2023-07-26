const dotenv = require("dotenv");
dotenv.config().parsed;

const config = {
  db: {
    host: process.env.HOST,
    port: process.env.PORT_DB,
    user: "root",
    password: "root",
    database: "k",
    charset: "utf8mb4",
  },
};

module.exports = config;
