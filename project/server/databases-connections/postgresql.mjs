import postgresql from 'pg'

const pool = new postgresql.Pool({
  user: 'admin',
  host: 'localhost',
  database: 'varejao',
  password: 'admin',
  port: 5432,
})

export default {
  query: (query, params) => pool.query(query, params)
}