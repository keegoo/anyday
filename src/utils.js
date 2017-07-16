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
  return type === 'View' ? `android.view.${type}` : `android.widget.${type}`
}

exports.sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}