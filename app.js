// including packages
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}


// connect MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/expense', { useNewUrlParser: true, useCreateIndex: true })

// getting connection object after connected with mongoDB
const db = mongoose.connection

// setting handlebars as template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// using middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
  secret: 'djkwej',
  resave: 'false',
  saveUninitialized: 'false'
}))

// 使用passport
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport.js')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()      // 辨識使用者是否已經登入的變數，讓 view 可以使用
  // 新增兩個 flash message 變數 
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('error')
  next()
})


// checking if database connected normally
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// setting routes

app.use('/', require('./routes/home.js'))
app.use('/records', require('./routes/record.js'))
app.use('/users', require('./routes/user.js'))
app.use('/auth', require('./routes/auths'))



// listening server and  
app.listen(process.env.PORT || 3000, () => {
  console.log('web server is running')
})