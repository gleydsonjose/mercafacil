// Services[currentClient][Service][Method]
const Services = require('../services/index.js')
const express = require('express')
const jwt = require('jsonwebtoken')
const getCurrentClientData = require('../helpers/getCurrentClientData.js')
const router = express.Router()

router.post('/login', async (req, res) => {
  const { login, password, id_client } = req.body


  try {
    const currentClient = getCurrentClientData(id_client)
    const user = await Services[currentClient.name]['UsersServices']['login'](login, password, id_client)

    if (user) {
      const token = jwt.sign(user, currentClient.privateKey)

      res.status(200).json({
        status: 'success',
        data: {
          token
        },
        message: 'Login realizado com sucesso'
      })      
    } else {
      res.status(406).json({
        status: 'error',
        message: 'Dados incorretos'
      })      
    }

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Houve um problema no servidor, aguarde um momento'
    })

    console.error(err)
  }
})

router.post('/register', async (req, res) => {
  const { login, password, id_client } = req.body

  try {
    const currentClient = getCurrentClientData(id_client)
    const loginExists = await Services[currentClient.name]['UsersServices']['checkIfLoginExists'](login)

    if (loginExists) {
      res.status(406).json({
        status: 'error',
        message: 'Login já em uso'
      })
    } else {
      await Services[currentClient.name]['UsersServices']['saveOne'](login, password, id_client)

      res.status(201).json({
        status: 'success',
        message: 'Usuário criado com sucesso'
      })
    }

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Houve um problema no servidor, aguarde um momento'
    })

    console.error(err)
  }
})

module.exports = router