const express = require('express')
const cors = require('cors')
const UsersRoutes = require('./routes/Users.js')
const ContactsRoutes = require('./routes/Contacts.js')
const DatabaseStartData = require('./databases/start-data.js')
const app = express()
const port = 5000

DatabaseStartData()

app.use(cors())
app.use(express.json())
app.use('/api/user', UsersRoutes)
app.use('/api/contact', ContactsRoutes)

app.listen(port, () => {
  console.log(`O servidor está usando a porta ${port}`)
})