var Rx = require('rxjs')
var wd = require('wd')

var desired = require('./caps').android22
var wdUtils = require('./wdUtils')

let driver = wd.promiseChainRemote('127.0.0.1', 4723)

driver.init(desired).then(() => {

  console.log('begin')
  const targetYear = 2018

  return Promise.all([
      wdUtils.getDefaultYear(driver),
      wdUtils.getDefaultMonth(driver),
      wdUtils.getDefaultDay(driver)
    ])
    .then(values => console.log(values))
    .then(() => console.log('open year selector'))
    .then(() => {
      wdUtils.openYearSelector(driver)
    })
    .then(() => {
      return wdUtils.getYearSelectorLocation(driver)
    })
    .then(location => {
      wdUtils.chooseTargetYear(driver, wd, 2000, location)
    })
    .then(() => console.log('finish'))
})