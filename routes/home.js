const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const categoryIcon = require('../helpers/category.js')
const { dateFormat, dateFormatNoDate } = require('../helpers/date_format.js')
const uniqueMonth = require('../helpers/uniqueMonth.js')
const { authenticated } = require('../config/auth')
const setSelected = require('../helpers/setSelected.js')

router.get('/', authenticated, (req, res) => {
  Record.find({ userId: req.user._id }, (err, records) => {
    if (err) return log.error(err)
    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
    })
    const months = records.map(record => {
      return record.date
    }).sort((a, b) => {
      return a - b
    }).map(date => {
      return dateFormatNoDate(date)
    }).filter(uniqueMonth)
    return res.render('index', { records, totalAmount, months, helpers: { categoryIcon, dateFormat, setSelected } })
  })
})

module.exports = router
