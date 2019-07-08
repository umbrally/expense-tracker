const Record = require('../models/record.js')

module.exports = {
  dateFormat: (value) => {
    const year = value.getFullYear()
    const month = (value.getMonth() + 1 < 10 ? '0' : '') + (value.getMonth() + 1)
    const day = (value.getDate() < 10 ? '0' : '') + (value.getDate())
    const format = `${year}-${month}-${day}`
    return format
  },
  dateFormatNoDate: (value) => {
    const year = value.getFullYear()
    const month = (value.getMonth() + 1 < 10 ? '0' : '') + (value.getMonth() + 1)
    const format = `${year}-${month}`
    return format
  }

}
