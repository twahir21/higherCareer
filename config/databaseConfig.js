const { Pool } = require('pg');
const dotenv = require("dotenv");
dotenv.config()

const Database = new Pool({
  user: process.env.Db_user,
  password: process.env.Db_password,
  host: process.env.Db_host,
  port: process.env.Db_port, 
  database: process.env.Db_database
});

module.exports = Database;