import db from '../../databases-connections/postgresql.mjs'

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

function getOne(login, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: user } = await db.query('SELECT login, id_client FROM users WHERE login = $1 AND password = $2', [login, password])
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}

function saveOne(login, password) {
  return db.query('INSERT INTO users (login, password) VALUES ($1, $2)', [login, password])
}

export default {
  checkIfLoginExists,
  getOne,
  saveOne
}