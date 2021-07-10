// Services[currentClient][Service][Method]
const Services = require('../services/index.js')
const express = require('express')
const router = express.Router()
const checkIfUserLoggedIsAuthorized = require('../helpers/checkIfUserLoggedIsAuthorized.js')

router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers
    const userLoggedIsAuthorized = checkIfUserLoggedIsAuthorized(authorization)

    if (userLoggedIsAuthorized) {
      const contacts = await Services[userLoggedIsAuthorized.clientDetails.name]['ContactsServices']['getAll']()
  
      res.status(200).json({
        status: 'success',
        results: contacts.length,
        data: { contacts }
      })
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Usuário não autorizado'
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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { authorization } = req.headers
    const userLoggedIsAuthorized = checkIfUserLoggedIsAuthorized(authorization)

    if (userLoggedIsAuthorized) {
      const contact = await Services[userLoggedIsAuthorized.clientDetails.name]['ContactsServices']['getOne'](id)
  
      res.status(200).json({
        status: 'success',
        data: { contact }
      })
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Usuário não autorizado'
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

router.post('/', async (req, res) => {
  try {
    const { authorization } = req.headers
    const { name, cellphone } = req.body
    const userLoggedIsAuthorized = checkIfUserLoggedIsAuthorized(authorization)

    if (userLoggedIsAuthorized) {
      const contactId = await Services[userLoggedIsAuthorized.clientDetails.name]['ContactsServices']['saveOne'](name, cellphone)
      const contact = await Services[userLoggedIsAuthorized.clientDetails.name]['ContactsServices']['getOne'](contactId)

      res.status(201).json({
        status: 'success',
        data: {
          contact
        },
        message: 'O contato foi salvo com sucesso'
      })
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Usuário não autorizado'
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

router.put('/', async (req, res) => {
  try {
    const { authorization } = req.headers
    const { id, name, cellphone } = req.body
    const userLoggedIsAuthorized = checkIfUserLoggedIsAuthorized(authorization)

    if (userLoggedIsAuthorized) {
      const contactUpdated = await Services[userLoggedIsAuthorized.clientDetails.name]['ContactsServices']['updateOne'](id, name, cellphone)

      if (contactUpdated) {
        const contact = await Services[userLoggedIsAuthorized.clientDetails.name]['ContactsServices']['getOne'](id)

        res.status(201).json({
          status: 'success',
          data: {
            contact
          },
          message: 'O contato foi atualizado com sucesso'
        })
      } else {
        res.status(400).json({
          status: 'error',
          message: 'Não foi possível atualizar o contato'
        })
      }
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Usuário não autorizado'
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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { authorization } = req.headers
    const userLoggedIsAuthorized = checkIfUserLoggedIsAuthorized(authorization)

    if (userLoggedIsAuthorized) {
      const contactDeleted = await Services[userLoggedIsAuthorized.clientDetails.name]['ContactsServices']['deleteOne'](id)
      
      if (contactDeleted) {
        res.status(200).json({
          status: 'success',
          message: 'Contato deletado com sucesso'
        })
      } else {
        res.status(400).json({
          status: 'error',
          message: 'Não foi possível deletar o contato'
        })
      }
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Usuário não autorizado'
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