var Rx = require('rxjs')
var wd = require('wd')

var desired = require('./caps').android22
var wdUtils = require('./wdUtils')

let driver = wd.promiseChainRemote('127.0.0.1', 4723)

driver.init(desired).then(() => {

  console.log('begin')
  const targetYear = '2018-03-20'

  return Promise.all([
      wdUtils.getDefaultYear(driver),
      wdUtils.getDefaultMonth(driver),
      wdUtils.getDefaultDay(driver)
    ])
    .then(values => console.log(values))
    .then(() => console.log('open year selector'))
    .then(() => wdUtils.openYearSelector(driver))
    .then(() => wdUtils.getYearSelectorLocation(driver))
    .then(location => wdUtils.chooseTargetYear(driver, wd, 2000, location))
    .then(() => console.log('finish selecting year'))
    .then(() => wdUtils.getCalendarLocation(driver))
    .then(location => wdUtils.chooseTargetMonth(driver, wd, "January", location))
    .then(() => console.log('finish selecting month'))
    .then(() => wdUtils.chooseTargetDay(driver, 10))
    .catch(err => console.log(err))
})