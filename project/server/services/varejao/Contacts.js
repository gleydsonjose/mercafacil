const db = require('../../databases/connections/postgresql.js')

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
      resolve(contact[0])
    } catch (error) {
      reject(error)
    }
  })
}

function saveOne(name, cellphone) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows: contact } = await db.query('INSERT INTO contacts (name, cellphone) VALUES ($1, $2) RETURNING id', [name, cellphone])
      resolve(contact[0].id)
    } catch (error) {
      reject(error)
    }
  })
}

function updateOne(id, name, cellphone) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rowCount: contactUpdated } = await db.query('UPDATE contacts SET name = $2, cellphone = $3 WHERE id = $1', [id, name, cellphone])
      resolve(contactUpdated)
    } catch (error) {
      reject(error)
    }
  })
}

function deleteOne(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { rowCount: contactDeleted } = await db.query('DELETE FROM contacts WHERE id = $1', [id])
      resolve(contactDeleted)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getAll,
  getOne,
  saveOne,
  updateOne,
  deleteOne
}