require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT
// const port = 5000
const cors = require('cors')
const morgan = require('morgan')
const heroesRoutes = require('./routes/heroesRoutes')

// console.log(process.env.API_KEY)
// console.log(process.env.SECRET)
// console.log(process.env)

app.use(morgan('tiny'))

app.use(cors())
app.use(express.json())

app.use('/heroes', heroesRoutes)

app.listen(port, (req, res) => {
  console.log(`Server started in ${port}`)
})
