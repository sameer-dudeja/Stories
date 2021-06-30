const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

//load config
dotenv.config({ path: './config/config.env' })

//Passport Config
require('./config/passport')(passport)
connectDB()

const app = express()

//body Parser

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Handlebar helpers
const { formatDate } = require('./helpers/hbs')

//Handlebars
app.engine(
  '.hbs',
  exphbs({ helpers: { formatDate }, defaultLayout: 'main', extname: '.hbs' })
)
app.set('view engine', '.hbs')

//session Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.Port || 3000

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
