const db = require('../../databases/connections/mysql.js')

function checkIfLoginExists(login) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.query('SELECT login FROM users WHERE login = ?', [login])

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
      const user = await db.query('SELECT login, id_client FROM users WHERE login = ? AND password = ?', [login, password])
      resolve(user.length ? JSON.parse(JSON.stringify(user[0])) : false)
    } catch (error) {
      reject(error)
    }
  })
}

function saveOne(login, password, id_client) {
  return db.query('INSERT INTO users (login, password, id_client) VALUES (?, ?, ?)', [login, password, id_client])
}

module.exports = {
  checkIfLoginExists,
  login,
  saveOne
}