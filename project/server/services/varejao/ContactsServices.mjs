import db from '../../databases-connections/postgresql.mjs'

function getAll() {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: contacts } = await db.query('SELECT * FROM contacts')
      resolve(contacts)
    } catch (error) {
      reject(error)
    }
  })
}

function getOne(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: contact } = await db.query('SELECT * FROM contacts WHERE id = $1', [id])
      resolve(contact)
    } catch (error) {
      reject(error)
    }
  })
}

function saveOne(name, cellphone) {
  return new Promise(async (resolve, reject) => {
    try {
      await db.query('INSERT INTO contacts (name, cellphone) VALUES ($1, $2)', [name, cellphone])
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