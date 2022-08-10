const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const morgan = require('morgan')
const heroesRoutes = require('./routes/heroesRoutes')
const heroes = require('./heroes')

app.use(morgan('tiny'))

app.use(cors())
app.use(express.json())

app.use('/heroes', heroesRoutes)

app.listen(port, (req, res) => {
  console.log(`Server started in ${port}`)
})
