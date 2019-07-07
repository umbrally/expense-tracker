// custom block helpers of Handlebars 
function setSelected(value, currentValue) {
  if (value === currentValue) {
    return 'selected';
  } else {
    return '';
  }
}

module.exports = setSelected