var ep = require('./utils').expendElementPrefix
var utils = require('./utils')
var acUtils = require('./actionUtils')

exports.getDefaultYear = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/TextView'))
    .getAttribute("name")
    .catch(err => console.log(err)) 
}

exports.getDefaultMonth = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/LinearLayout/TextView[@index="0"]'))
    .text()
    .then(month => utils.monthAbbrToNum(month))
    .catch(err => console.log(err))
}

exports.getDefaultDay = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/LinearLayout/TextView[@index="1"]'))
    .text()
    .catch(err => console.log(err))
}


exports.openYearSelector = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/TextView'))
    .click()
    .sleep(1000)
    .catch(err => console.log(err))
}

exports.getYearSelectorLocation = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/ViewAnimator'))
    .then(ele => {
      return Promise.all([
          ele.getLocation(),
          ele.getSize()
        ])
    })
    .then((location) => {
      console.log(location)
      return location
    })
    .catch(err => console.log(err))
}

exports.getCalendarLocation = (driver) => {
  return exports.getYearSelectorLocation(driver)
}

exports.chooseTargetYear = (driver, wd, targetYear, location, direct) => {
  return driver
    .elementByXPath(ep(`//DatePicker/LinearLayout/ViewAnimator/ListView/TextView[@text="${targetYear}"]`))
    .click()
    .sleep(1000)
    .catch(err => {
      return Promise.all([
        acUtils.newSwipeArea(driver, wd, location, direct),
        utils.sleep(500)
      ])
      .then(() => exports.chooseTargetYear(driver, wd, targetYear, location, direct))
    })
}

exports.chooseTargetMonth = (driver, wd, targetMonth, location, direct) => {
  const monthAbbr = utils.monthNumToWord(targetMonth)
  return driver
    .elementByXPath(ep(`//DatePicker/LinearLayout/ViewAnimator/ListView/View/View[contains(@content-desc, "${monthAbbr}")]`))
    .text()
    .catch(err => {
      return Promise.all([
        acUtils.newSwipeArea(driver, wd, location, direct),
        utils.sleep(2000)
      ])
      .then(() => exports.chooseTargetMonth(driver, wd, targetMonth, location, direct))
    })
}

exports.chooseTargetDay = (driver, targetDay) => {
  return driver
    .elementByXPath(ep(`//DatePicker/LinearLayout/ViewAnimator/ListView/View/View[@index=${targetDay-1}]`))
    .click()
    .sleep(1000)
    .catch(err => console.log(err))
}