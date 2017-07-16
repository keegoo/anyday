var Rx = require('rxjs')

// =========================
// expend //ListView/TextView
// into //android.widget.ListView/android.widget.TextView
exports.expendElementPrefix = (xpathStr) => {
  if(xpathStr.startsWith('//')) {
    const tmp = xpathStr
     .split('/')
     .filter(x => x.length !== 0)
     .map(x => androidPrefix(x))
     .join('/')

    return '//' + tmp

  } else {
    return xpathStr 
  }
}

const androidPrefix = (type) => {
  // need to remove trailing selector
  // when 'View[@text="July"]'
  return type.replace(/\[.*\]/, '') === 'View' ? `android.view.${type}` : `android.widget.${type}`
}

exports.sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

exports.removeLeadingZero = (str) => { 
  return typeof(str) === 'string' ? `${Number(str)}` : str
}

exports.monthAbbrToNum = (str) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const index = months.map(x => x.toUpperCase()).indexOf(str.toUpperCase())
  return index === -1 ? '0' : `${index + 1}`
}

exports.monthNumToWord = (str) => {
  const months = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
    ]
  return months[Number(str) - 1]
}