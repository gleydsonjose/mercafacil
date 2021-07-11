const Services = require('../services/index.js')

const { contacts: macapaContacts } = require('./contacts-macapa.json')
const { contacts: varejaoContacts } = require('./contacts-varejao.json')

async function start() {
  try {
    const macapaContactsDatabase = await Services.Macapa['ContactsServices']['getAll']()
    const varejaoContactsDatabase = await Services.Varejao['ContactsServices']['getAll']()
    
    if (!macapaContactsDatabase.length) {
      macapaContacts.forEach(async (contact) => {
        const newName = contact.name.toUpperCase()
        const newCellphone = contact.cellphone.replace(/^(\d{2})+(\d{2})+(\d{5})+(\d{4})/, '+$1 ($2) $3-$4')

        await Services.Macapa['ContactsServices']['saveOne'](newName, newCellphone)
      })
    }

    if (!varejaoContactsDatabase.length) {
      varejaoContacts.forEach(async (contact) => {
        await Services.Varejao['ContactsServices']['saveOne'](contact.name, contact.cellphone)
      })
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = start