const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
//load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

//logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//Static folder

app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', require('./routes/index'))

const PORT = process.env.Port || 3000

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
