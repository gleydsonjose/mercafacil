const jwt = require('jsonwebtoken')
const getCurrentClientData = require('./getCurrentClientData.js')

module.exports = (authorization) => {
  const userLogged = jwt.decode(authorization)

  if (userLogged?.login && userLogged?.id_client) {
    const currentClient = getCurrentClientData(userLogged.id_client)

    try {
      return {
        userLogged: jwt.verify(authorization, currentClient?.privateKey),
        clientDetails: currentClient
      }
    } catch {
      return false
    }
  }
}