import ContactsServicesVarejao from './varejao/ContactsServices.mjs'
import UsersServicesVarejao from './varejao/UsersServices.mjs'
import ContactsServicesMacapa from './macapa/ContactsServices.mjs'
import UsersServicesMacapa from './macapa/UsersServices.mjs'

export default {
  Varejao: {
    ContactsServices: ContactsServicesVarejao,
    UsersServices: UsersServicesVarejao
  },

  Macapa: {
    ContactsServices: ContactsServicesMacapa,
    UsersServices: UsersServicesMacapa
  }
}