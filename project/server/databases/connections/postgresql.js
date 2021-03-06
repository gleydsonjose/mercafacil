const postgresql = require('pg')

const pool = new postgresql.Pool({
  user: 'admin',
  host: 'localhost',
  database: 'varejao',
  password: 'admin',
  port: 5432,
})

module.exports = {
  query: (query, params) => pool.query(query, params)
}