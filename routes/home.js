const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const categoryIcon = require('../helpers/category.js')
const { dateFormat, dateFormatNoDate } = require('../helpers/date_format.js')
const uniqueMonth = require('../helpers/uniqueMonth.js')

router.get('/', (req, res) => {
  const totalAmount = 20000
  Record.find({}, (err, records) => {
    if (err) return log.error(err)
    const months = records.map(record => {
      return record.date
    }).sort((a, b) => {
      return a - b
    }).map(date => {
      return dateFormatNoDate(date)
    }).filter(uniqueMonth)
    return res.render('index', { records, totalAmount, months, helpers: { categoryIcon, dateFormat } })
  })
})

module.exports = router
