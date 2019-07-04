// including packages
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


// connect MongoDB
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useCreateIndex: true })

// getting connection object after connected with mongoDB
const db = mongoose.connection

// setting handlebars as template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// using middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))


// checking if database connected normally
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// setting routes

app.use('/', require('./routes/home.js'))
// app.use('/records', require('./routes/record.js'))



// listening server and  
app.listen(3000, () => {
  console.log('web server is running')
})