// import clients from '../clients.json'
const clients = require('../clients.json')
module.exports = (idClient) => clients.find(({ id }) => id === idClient)