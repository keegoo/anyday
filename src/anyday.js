var Rx = require('rxjs')
var wd = require('wd')

var desired = require('./caps').android22
var ep = require('./utils').expendElementPrefix
var wdUtils = require('./wdUtils')

let driver = wd.promiseChainRemote('127.0.0.1', 4723)

driver.init(desired).then(() => {

  console.log('begin')
  const targetYear = 2018

  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/TextView'))
    .click()
    .sleep(3000)
    .then(() => {
      return Promise.all([
          Promise.resolve(wdUtils.getDefaultYear(driver)), 
          Promise.resolve(wdUtils.getYearSelectorLocation(driver))
        ])
        .then((values) => {
          console.log('defaultYear: ' + values[0])
          console.log('location: ' + values[1])

          return wdUtils.newSwipe(driver, wd, values[1])
        })
    })
    .then(() => console.log('finish'))
})