const db = require('../../databases-connections/postgresql.js')

function checkIfLoginExists(login) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: user } = await db.query('SELECT login FROM users WHERE login = $1', [login])

      if (user.length) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}

function login(login, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: user } = await db.query('SELECT login, id_client FROM users WHERE login = $1 AND password = $2', [login, password])
      resolve(user.length ? user[0] : false)
    } catch (error) {
      reject(error)
    }
  })
}

function saveOne(login, password, id_client) {
  return db.query('INSERT INTO users (login, password, id_client) VALUES ($1, $2, $3)', [login, password, id_client])
}

module.exports = {
  checkIfLoginExists,
  login,
  saveOne
}