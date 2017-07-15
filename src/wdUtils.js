var ep = require('./utils').expendElementPrefix

exports.newSwipe = (driver, wd, locations) => {
  const action = new wd.TouchAction(driver)
  return action
    .press({x: 300, y: 700})
    .wait(1000)
    .moveTo({x: 300, y: 1000})
    .release()
    .perform()
}

exports.getDefaultYear = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/ViewAnimator'))
    .getAttribute("name")
    .catch(err => console.log(err))
}

exports.getDefaultMonth = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/LinearLayout/TextView[@index="0"]'))
    .text()
    .catch(err => console.log(err))
}

exports.getDefaultDay = (driver) => {
  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/LinearLayout/TextView[@index="1"]'))
    .text()
    .catch(err => console.log(err))
}

exports.getYearSelectorLocation = (driver) => {
  return driver
    .elementsByXPath(ep('//DatePicker/LinearLayout/ViewAnimator/ListView/TextView'))
    .then(els => {
      return Promise.all([
          els[0].getLocation(),
          els[els.length - 1].getLocation()
        ])
    })
    .catch(err => console.log(err))
}