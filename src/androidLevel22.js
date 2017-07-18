var api = require('./androidGeneric')
var ep = require('./utils').expendElementPrefix
var utils = require('./utils')
var acUtils = require('./actionUtils')

api.getDefaultYear = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/TextView'))
    .getAttribute("name")
    .catch(err => console.log(err)) 
}

api.getDefaultMonth = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/LinearLayout/TextView[@index="0"]'))
    .text()
    .then(month => utils.monthAbbrToNum(month))
    .catch(err => console.log(err))
}

api.getDefaultDay = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/LinearLayout/TextView[@index="1"]'))
    .text()
    .catch(err => console.log(err))
}

api.openYearSelector = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/TextView'))
    .click()
    .sleep(1000)
    .catch(err => console.log(err))
}

api.getYearSelectorLocation = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/ViewAnimator'))
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
  return api.getYearSelectorLocation(driver)
}

api.getDaySelectorLocation = (driver) => {
  return api.getYearSelectorLocation(driver)
}

api.chooseTargetYear = (driver, wd, targetYear, location, direct) => {
  return driver
    .elementByXPath(ep(`//DatePicker/LinearLayout/ViewAnimator/ListView/TextView[@text="${targetYear}"]`))
    .click()
    .sleep(1000)
    .catch(err => {
      return Promise.all([
        acUtils.newSwipeArea(driver, wd, location, direct),
        utils.sleep(500)
      ])
      .then(() => api.chooseTargetYear(driver, wd, targetYear, location, direct))
    })
}

api.chooseTargetMonth = (driver, wd, targetMonth, location, direct) => {
  const monthAbbr = utils.monthNumToWord(targetMonth)
  return driver
    .elementByXPath(ep(`//DatePicker/LinearLayout/ViewAnimator/ListView/View/View[contains(@content-desc, "${monthAbbr}")]`))
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
  return driver
    .elementByXPath(ep(`//DatePicker/LinearLayout/ViewAnimator/ListView/View/View[@index=${targetDay-1}]`))
    .click()
    .sleep(1000)
    .catch(err => console.log(err))
}

exports.api = api