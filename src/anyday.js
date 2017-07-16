var wd = require('wd')

var desired = require('./caps').android22
var wdUtils = require('./wdUtils')
var utils = require('./utils')

let driver = wd.promiseChainRemote('127.0.0.1', 4723)

driver.init(desired).then(() => {

  // ======= change calendar here=======
  const calendar = '2018-12-31'
  // examples: 
  // const calendar = '2017-01-31'
  // const calendar = '2021-12-01'
  // const calendar = '2000-01-01'
  // ===================================

  const [targetYear, targetMonth, targetDay] = calendar.split('-').map(utils.removeLeadingZero)
  let yearLookupdirect = 'up'
  let monthLookupdirect = 'up'

  return Promise.all([
      // get default year, month and day when the calendar lauched
      wdUtils.getDefaultYear(driver),
      wdUtils.getDefaultMonth(driver),
      wdUtils.getDefaultDay(driver)
    ])
    .then(values => {
      // if the year you're looking for is a future year,
      //   then you need to swipe down in 'year selector' to find it
      // if the year you're looking for is a past year,
      //   then you need to swipe up in 'year selector' to find it
      // same ideas apply to month
      const [year, month, day] = values
      yearLookupdirect = Number(targetYear) > Number(year) ? 'up' : 'down'
      monthLookupdirect = Number(targetMonth) > Number(month) ? 'up' : 'down'
    })
    // step 1: click 'Year' to open 'Year selector'
    .then(() => wdUtils.openYearSelector(driver))
    // step 2: get 'Year selector' location
    .then(() => wdUtils.getYearSelectorLocation(driver))
    // step 3: swipe in the 'Year selector', until the target year been clicked(chosen)
    .then(location => wdUtils.chooseTargetYear(driver, wd, targetYear, location, yearLookupdirect))
    // step 4: get 'Calendar' location (Calendar share the same area with Year Selector)
    .then(() => wdUtils.getCalendarLocation(driver))
    // step 5: swipe in the 'Canledar', until the target month showed up.
    .then(location => wdUtils.chooseTargetMonth(driver, wd, targetMonth, location, monthLookupdirect))
    // step 6: choose target day within the target month
    .then(() => wdUtils.chooseTargetDay(driver, targetDay))
    // final: catch any error
    .catch(err => console.log(err))
})

