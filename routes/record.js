const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const categoryIcon = require('../helpers/category.js')
const { dateFormat, dateFormatNoDate } = require('../helpers/date_format.js')
const uniqueMonth = require('../helpers/uniqueMonth.js')
const setSelected = require('../helpers/setSelected.js')


// 列出全部 Todo
router.get('/', (req, res) => {
  return res.redirect('/')
})

// 新增一筆支出頁面
router.get('/new', (req, res) => {
  res.render('new', { helpers: { dateFormat, setSelected } })
})

// 新增一筆支出動作
router.post('/', (req, res) => {
  const record = new Record({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount
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
router.get('/:id/copy', (req, res) => {
  let reqParamsId = req.params.id
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) {
      console.error(err)
      return res.send(400)
    }
    console.log('date', record.date, typeof record.date)
    return res.render('new', { reqParamsId, record, helpers: { dateFormat, setSelected } })
  })
})

// 編輯支出的頁面
router.get('/:id/edit', (req, res) => {
  let reqParamsId = req.params.id
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) {
      console.error(err)
      return res.send(400)
    }
    console.log('date', record.date, typeof record.date)
    return res.render('new', { reqParamsId, record, helpers: { dateFormat, setSelected } })
  })
})

// 儲存變更支出動作
router.put('/:id', (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
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

module.exports = router