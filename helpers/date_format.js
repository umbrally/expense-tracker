const Record = require('../models/record.js')

module.exports = {
  dateFormat: (value) => {
    const year = value.getFullYear()
    const month = value.getMonth()
    const day = value.getDay()
    const format = `${year}-${month}-${day}`
    return format
  },
  dateFormatNoDate: (value) => {
    const year = value.getFullYear()
    const month = value.getMonth()
    const format = `${year}-${month}`
    return format
  }

}

// module.exports = dateFormat