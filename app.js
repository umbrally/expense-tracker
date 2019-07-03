// including packages
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

// connect MongoDB
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true, useCreateIndex: true })

// get connection object after connected with mongoDB
const db = mongoose.connection

// using middleware

// check if database connected normally
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// setting routes

// listening server and  
app.listen(3000, () => {
  console.log('web server is running')
})