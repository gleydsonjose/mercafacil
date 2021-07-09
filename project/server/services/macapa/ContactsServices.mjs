import db from '../../databases-connections/mysql.mjs'

function getAll() {
  return new Promise(async (resolve, reject) => {
    try {
      const contacts = await db.query('SELECT * FROM contacts')
      resolve(contacts)
    } catch (error) {
      reject(error)
    }
  })
}

function getOne(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const contact = await db.query('SELECT * FROM contacts WHERE id = ?', [id])
      resolve(contact)
    } catch (error) {
      reject(error)
    }
  })
}

function saveOne(name, cellphone) {
  return new Promise(async (resolve, reject) => {
    try {
      await db.query('INSERT INTO contacts (name, cellphone) VALUES (?, ?)', [name, cellphone])
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

export default {
  getAll,
  getOne,
  saveOne
}