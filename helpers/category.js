// custom block helpers of Handlebars 
function categoryIcon(value) {
  switch (value) {
    case '家居物業':
      return '<i class="fas fa-home" style="font-size: 30px; color: blue"></i>'
    case '交通出行':
      return '<i class="fas fa-shuttle-van" style="font-size: 30px; color: blue" ></i>'
    case '休閒娛樂':
      return '<i class="fas fa-grin-beam" style="font-size: 30px; color: blue"></i>'
    case '餐飲食品':
      return '<i class="fas fa-utensils" style="font-size: 30px; color: blue"></i>'
    case '其他':
      return '<i class="fas fa-pen" style="font-size: 30px; color: blue"></i>'

  }
}

module.exports = categoryIcon

