exports.newSwipe = (driver, locations) => {
  const action = new wd.TouchAction(driver)
  return action
    .press({x: 300, y: 700})
    .wait(1000)
    .moveTo({x: 300, y: 1000})
    .release()
    .perform()
}