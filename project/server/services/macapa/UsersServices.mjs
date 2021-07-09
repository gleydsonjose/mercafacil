import db from '../../databases-connections/mysql.mjs'

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

function getOne(login, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.query('SELECT login, id_client FROM users WHERE login = ? AND password = ?', [login, password])
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}

function saveOne(login, password) {
  return db.query('INSERT INTO users (login, password) VALUES (?, ?)', [login, password])
}

export default {
  checkIfLoginExists,
  getOne,
  saveOne
}