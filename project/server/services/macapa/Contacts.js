const db = require('../../databases/connections/mysql.js')

function getAll() {
  return new Promise(async (resolve, reject) => {
    try {
      const contacts = await db.query('SELECT * FROM contacts ORDER BY id')
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
      resolve(contact[0])
    } catch (error) {
      reject(error)
    }
  })
}

function saveOne(name, cellphone) {
  return new Promise(async (resolve, reject) => {
    try {
      const { insertId: contactId} = await db.query('INSERT INTO contacts (name, cellphone) VALUES (?, ?)', [name, cellphone])
      resolve(contactId)
    } catch (error) {
      reject(error)
    }
  })
}

function updateOne(id, name, cellphone) {
  return new Promise(async (resolve, reject) => {
    try {
      const { changedRows: contactUpdated } = await db.query('UPDATE contacts SET name = ?, cellphone = ? WHERE id = ?', [name, cellphone, id])
      resolve(contactUpdated)
    } catch (error) {
      reject(error)
    }
  })
}

function deleteOne(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const { affectedRows: contactDeleted } = await db.query('DELETE FROM contacts WHERE id = ?', [id])
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