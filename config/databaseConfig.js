const { Pool } = require('pg');

const Database = new Pool({
  user: 'postgres',
  password: 'blackcoder@1234',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'your_database_name'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};