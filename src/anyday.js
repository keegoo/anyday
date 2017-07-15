var Rx = require('rxjs')
var wd = require('wd')

var desired = require('./caps').android22
var ep = require('./utils').expendElementPrefix

// const source = Rx.Observable.interval(100).take(9)
//   .map(i => ['1', '1', 'foo', '2'][i])

// const result = source
//   .map(x => parseInt(x))
//   .filter(x => !isNaN(x))
//   .reduce((x, y) => x + y)

// result.subscribe(x => console.log(x))

let driver = wd.promiseChainRemote('127.0.0.1', 4723)


driver.init(desired).then(() => {
  console.log('begin')
  // return driver
  //   .elementByXPath('//DatePicker/LinearLayout/LinearLayout/TextView')
  //   .text()
  //   .then(text => console.log(text))
  //   .then(() => console.log('got date'))
  //   .elementByXPath('//DatePicker/LinearLayout/LinearLayout/LinearLayout/LinearLayout/TextView')
  //   .text()
  //   .then(text => console.log(text))
  //   .then(() => console.log('got month'))
  const targetYear = 2018

  return driver
    .elementByXPath(ep('//DatePicker/LinearLayout/LinearLayout/LinearLayout/TextView'))
    .click()
    .sleep(3000)
    .then(() => {
      // return driver.elementByXPath(ep('//DatePicker/LinearLayout/ViewAnimator'))
      // .getAttribute("name")
      // .then(text => console.log(text))
      return Promise.all([getDefaultYear(driver), getYearSelectorLocation(driver)])
        .then((values) => {
          console.log('defaultYear: ' + values[0])
          console.log('locations: ' + values[1])
          // if(targetYear > values[0]) {
          //   console.log('swipe up')
          //   return newSwipe(driver, locations)
          // } else {
          //   console.log('swipe down')
          //   return newSwipe(driver, locations)
          // }
        })
    })
    // .elementsByXPath(ep('//DatePicker/LinearLayout/ViewAnimator/ListView/TextView'))
    // .then(els => {
    //   return Promise.all([
    //       els[0].getLocation(),
    //       els[els.length - 1].getLocation()
    //     ])
    // })
    // .then(locs => newSwipe(driver, locs))
    .then(() => console.log('finish'))
})

const newSwipe = (driver, locations) => {
  const action = new wd.TouchAction(driver)
  return action
    .press({x: locations[0].x, y: locations[0].y})
    .wait(1000)
    .moveTo({x: locations[1].x, y: locations[1].y})
    .release()
    .perform()
}

const getDefaultYear = (driver) => {
  return 1
  // return driver.elementByXPath(ep('//DatePicker/LinearLayout/ViewAnimator'))
  //   .getAttribute("name")
}

const getYearSelectorLocation = (driver) => {
  return 2
  // return driver.elementByXPath(ep('//DatePicker/LinearLayout/ViewAnimator/ListView/TextView'))
  //   .then(els => {
  //     return Promise.all([
  //         els[0].getLocation(),
  //         els[els.length - 1].getLocation()
  //       ])
  //   })
}

const setYear = (year) => {

}