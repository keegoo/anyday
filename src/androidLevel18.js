var api = require('./androidGeneric')
var ep = require('./utils').expendElementPrefix
var utils = require('./utils')
var acUtils = require('./actionUtils')

api.getDefaultYear = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/NumberPicker[@index="2"]/EditText'))
    .text()
    .catch(err => console.log(err))
}

api.getDefaultMonth = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/NumberPicker[@index="0"]/EditText'))
    .text()
    .then(month => utils.monthAbbrToNum(month))
    .catch(err => console.log(err))
}

api.getDefaultDay = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/NumberPicker[@index="1"]/EditText'))
    .text()
    .catch(err => console.log(err))
}

api.openYearSelector = (driver) => {
  return 'do nothing'
}

api.getYearSelectorLocation = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/NumberPicker[@index="2"]'))
    .then(ele => {
      return Promise.all([
          ele.getLocation(),
          ele.getSize()
        ])
    })
    .then(location => {
      return location
    })
    .catch(err => console.log(err))
}

api.getMonthSelectorLocation = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/NumberPicker[@index="0"]'))
    .then(ele => {
      return Promise.all([
          ele.getLocation(),
          ele.getSize()
        ])
    })
    .then(location => {
      return location
    })
    .catch(err => console.log(err))
}

api.getDaySelectorLocation = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/NumberPicker[@index="1"]'))
    .then(ele => {
      return Promise.all([
          ele.getLocation(),
          ele.getSize()
        ])
    })
    .then(location => {
      return location
    })
    .catch(err => console.log(err))
}

api.chooseTargetYear = (driver, wd, targetYear, location, direct) => {
  return driver
    .elementByXPath(ep(`//DatePicker/LinearLayout/LinearLayout/NumberPicker[@index="2"]/EditText[@text="${targetYear}"]`))
    .text()
    .catch(err => {
      return Promise.all([
        acUtils.newSwipeArea(driver, wd, location, direct),
        utils.sleep(2000)
      ])
      .then(() => api.chooseTargetYear(driver, wd, targetYear, location, direct))
    })
}

api.chooseTargetMonth = (driver, wd, targetMonth, location, direct) => {
  const monthAbbr = utils.monthNumToAbbr(targetMonth)
  return driver
    .elementByXPath(ep(`//DatePicker/LinearLayout/LinearLayout/NumberPicker[@index="0"]/EditText[@text="${monthAbbr}"]`))
    .text()
    .catch(err => {
      return Promise.all([
        acUtils.newSwipeArea(driver, wd, location, direct),
        utils.sleep(2000)
      ])
      .then(() => api.chooseTargetMonth(driver, wd, targetMonth, location, direct))
    })
}

api.chooseTargetDay = (driver, wd, targetDay, location, direct) => {
  const day = targetDay > 9 ? targetDay : `0${targetDay}`
  return driver
    .elementByXPath(ep(`//DatePicker/LinearLayout/LinearLayout/NumberPicker[@index="1"]/EditText[@text="${day}"]`))
    .text()
    .catch(err => {
      return Promise.all([
        acUtils.newSwipeArea(driver, wd, location, direct),
        utils.sleep(2000)
      ])
      .then(() => api.chooseTargetDay(driver, wd, targetDay, location, direct))
    })
}

exports.api = api