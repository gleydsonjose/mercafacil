import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'macapa',
  port: 3306
})
 
connection.connect();

function query(query, params = []) {
  let newQuery = query

  if (params.length) {
    params.forEach((paramValue) => {
      newQuery = newQuery.replace('?', `'${paramValue}'`)
    })
  }

  return new Promise((resolve, reject) => {
    connection.query(newQuery, (error, results, fields) => {
      if (error) reject(error);
      resolve(results)
    })
  })
}

export default {
  query
}