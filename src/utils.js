var Rx = require('rxjs')

// =========================
// expend //ListView/TextView
// into //android.widget.ListView/android.widget.TextView
exports.expendElementPrefix = (xpathStr) => {
  if(xpathStr.startsWith('//')) {
    const tmp = xpathStr
     .split('/')
     .filter(x => x.length !== 0)
     .map(x => `android.widget.${x}`)
     .join('/')

    return '//' + tmp

  } else {
    return xpathStr 
  }
}

