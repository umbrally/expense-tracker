const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const { dateFormat, dateFormatNoDate } = require('../helpers/date_format.js')
const categoryIcon = require('../helpers/category.js')
const uniqueMonth = require('../helpers/uniqueMonth.js')
const setSelected = require('../helpers/setSelected.js')
const { authenticated } = require('../config/auth.js')


// 篩選 record
router.get('/', authenticated, (req, res) => {
  const month = req.query.month
  const category = req.query.category
  const regExp = new RegExp(category, 'i')
  const dateStart = new Date(req.query.month)
  const dateEnd = new Date(req.query.month)
  dateEnd.setMonth(dateEnd.getMonth() + 1)
  Record.find({
    userId: req.user._id,
  }, (err, fullRecords) => {
    if (err) return log.error(err)

  })
    .sort({ date: 'asc' })
    .exec((err, fullRecords) => {
      const records = fullRecords.filter(record => {
        if (req.query.month) { return (record.date >= dateStart) && (record.date < dateEnd) && (regExp.test(record.category)) }
        else { return (regExp.test(record.category)) }
      })
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
      })
      const months = fullRecords.map(record => {
        return record.date
      }).sort((a, b) => {
        return a - b
      }).map(date => {
        return dateFormatNoDate(date)
      }).filter(uniqueMonth)
      return res.render('index', { records, totalAmount, months, month, category, helpers: { setSelected, categoryIcon, dateFormat } })
    })
})

// 新增一筆支出頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new', { helpers: { dateFormat, setSelected } })
})

// 新增一筆支出動作
router.post('/', authenticated, (req, res) => {
  const record = new Record({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    userId: req.user._id
  })
  record.save(err => {
    if (err) {
      console.log(err)
      return res.send(400)
    }
    return res.redirect('/')
  })
})

// 複製支出的頁面
router.get('/:id/copy', authenticated, (req, res) => {
  let reqParamsId = req.params.id
  Record.findOne({ userId: req.user._id, _id: req.params.id }, (err, record) => {
    if (err) {
      console.error(err)
      return res.send(400)
    }
    console.log('date', record.date, typeof record.date)
    return res.render('new', { reqParamsId, record, helpers: { dateFormat, setSelected } })
  })
})

// 編輯支出的頁面
router.get('/:id/edit', authenticated, (req, res) => {
  let reqParamsId = req.params.id
  Record.findOne({ userId: req.user._id, _id: req.params.id }, (err, record) => {
    if (err) {
      console.error(err)
      return res.send(400)
    }
    return res.render('edit', { reqParamsId, record, helpers: { dateFormat, setSelected } })
  })
})

// 儲存變更支出動作
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({ userId: req.user._id, _id: req.params.id }, (err, record) => {
    if (err) {
      console.error(err)
      return res.send(500)
    }
    record.name = req.body.name
    record.date = req.body.date
    record.category = req.body.category
    record.amount = req.body.amount
    record.userId = req.user._id
    record.save((err => {
      if (err) {
        console.error(err)
        return res.send(500)
      }
      return res.redirect('/')
    }))
  })
})

// 刪除支出動作
router.delete('/:id', authenticated, (req, res) => {
  Record.findOne({ userId: req.user._id, _id: req.params.id }, (err, record) => {
    if (err) {
      console.error(err)
      return res.send(500)
    }
    record.remove(err => {
      if (err) {
        console.error(err)
        return res.send(500)
      }
      return res.redirect('/')
    })
  })
})

module.exports = router