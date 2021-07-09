// Services[currentClient][Service][Method]
import Services from './services/index.mjs'

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'


const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const clients = [
  {
    id: 1,
    name: 'Macapa',
    privateKey: 'Zq4t7w!z%C*F-JaNdRgUjXn2r5u8x/A?'
  },
  {
    id: 2,
    name: 'Varejao',
    privateKey: 'hVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x'
  }
]

const getCurrentClientName = (idClient) => clients.find(({ id }) => id === idClient)

const checkIfUserLoggedIsAuthorized = (authorization) => {
  const userLogged = jwt.decode(authorization)

  if (userLogged?.login && userLogged?.id_client) {
    const currentClient = getCurrentClientName(userLogged.id_client)

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

app.get('/api/contacts', async (req, res) => {
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

app.get('/api/contact/:id', async (req, res) => {
  try {
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

app.post('/api/contact', async (req, res) => {
  
  try {
    const { authorization } = req.headers
    const { name, cellphone } = req.body
    const userLoggedIsAuthorized = checkIfUserLoggedIsAuthorized(authorization)

    if (userLoggedIsAuthorized) {
      await Services[userLoggedIsAuthorized.clientDetails.name]['ContactsServices']['saveOne'](name, cellphone)
      const contact = await Services[userLoggedIsAuthorized.clientDetails.name]['ContactsServices']['getOne'](id)

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

app.post('/api/user/login', async (req, res) => {
  const { login, password, id_client } = req.body

  try {
    const currentClient = getCurrentClientName(id_client)
    const user = await Services[currentClient.name]['UsersServices']['getOne'](login, password, id_client)

    if (user.length) {
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

app.post('/api/user/register', async (req, res) => {
  const { login, password, id_client } = req.body

  try {
    const currentClient = getCurrentClientName(id_client)
    const loginExists = await Services[currentClient.name]['UsersServices']['checkIfLoginExists'](login)

    if (loginExists) {
      res.status(406).json({
        status: 'error',
        message: 'Login já em uso'
      })
    } else {
      await Services[currentClient.name]['UsersServices']['saveOne'](login, password)
      const user = await Services[currentClient.name]['UsersServices']['getOne'](login, password)
      const token = jwt.sign(user, currentClient.privateKey)

      res.status(201).json({
        status: 'success',
        data: {
          token
        },
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

app.listen(port, () => {
  console.log(`O servidor está usando a porta ${port}`)
})