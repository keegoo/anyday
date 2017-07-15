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
    .then(() => console.log('get default year'))
    .then(() => {
      return Promise.all([
          wdUtils.getDefaultYear(driver), 
          wdUtils.getYearSelectorLocation(driver)
        ])
        .then((values) => {
          console.log('defaultYear: ' + values[0])
          console.log('location: ' + values[1])

          return wdUtils.newSwipe(driver, wd, values[1])
        })
    })
    .then(() => console.log('get default month'))
    .then(() => wdUtils.getDefaultMonth(driver))
    .then(text => console.log(text))
    .then(() => console.log('get default day'))
    .then(() => wdUtils.getDefaultDay(driver))
    .then(text => console.log(text))
    .then(() => console.log('finish'))
})