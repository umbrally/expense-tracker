const { body, validationResult } = require('express-validator')
const categoryList = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
module.exports = {
  recordValidator: [
    body('name')
      .exists()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('支出名稱為必填且字數需小於100字'),
    body('category')
      .exists()
      .custom(value => {
        return categoryList.indexOf(value) > -1
      })
      .withMessage('請選擇支出類別'),
    body('date')
      .exists()
      .isISO8601()
      .custom(value => {
        console.log(new Date(value), new Date(2000, 0, 1, 8))
        return new Date(value) > new Date(2000, 0, 1, 8)
      })
      .withMessage('請確認日期輸入格式是否正確'),
    body('amount')
      .exists()
      .trim()
      .isNumeric()
      .withMessage('請輸入支出金額數字')
  ]
}