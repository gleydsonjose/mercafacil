const ContactsServicesVarejao = require('./varejao/Contacts.js')
const UsersServicesVarejao = require('./varejao/Users.js')
const ContactsServicesMacapa = require('./macapa/Contacts.js')
const UsersServicesMacapa = require('./macapa/Users.js')

module.exports = {
  Varejao: {
    ContactsServices: ContactsServicesVarejao,
    UsersServices: UsersServicesVarejao
  },

  Macapa: {
    ContactsServices: ContactsServicesMacapa,
    UsersServices: UsersServicesMacapa
  }
}