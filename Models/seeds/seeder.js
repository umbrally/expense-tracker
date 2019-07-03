const mongoose = require('mongoose')
const User = require('../user.js')
const Record = require('../record.js')
const bcrypt = require('bcryptjs')
const userSeed = [{ name: 'Zoey', email: 'user1@example.com', password: '1234' }, { name: 'Amber', email: 'user2@example.com', password: '5678' }]
const recordSeed = [{ name: '午餐', category: '餐飲食品', date: '2019-06-29', amount: 150 }, { name: '捷運', category: '交通出行', date: '2019-07-01', amount: 35 }, { name: '房貸', category: '家居物業', date: '2019-07-02', amount: 30000 }, { name: '電影票', category: '休閒娛樂', date: '2019-06-30', amount: 300 }]

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
  userSeed.forEach(user => {
    const { name, email, password } = user
    const newUser = new User({
      name: name,
      email: email,
      password: password
    })
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save(err => {
            if (err) return console.error(err)
            return
          })
      })
    )
  })
  User.findOne({ name: 'Zoey' }, (err, user) => {
    for (let i = 0; i < 2; i++) {
      let recordData = recordSeed[i]
      recordData.userId = user._id
      Record.create(recordData)
    }
  })
  User.findOne({ name: 'Amber' }, (err, user) => {
    for (let i = 0; i < 4; i++) {
      let recordData = recordSeed[i]
      recordData.userId = user._id
      Record.create(recordData)
    }
  })

})