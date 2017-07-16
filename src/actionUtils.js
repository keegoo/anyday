//
// **newSwipeArea** is the exposed function for swipe action.
// you simply passed in: 
//   1. [{x, y}, {width, height}], a.k.a location.
//   2. a direction: up/down/left/right.
// then **newSwipeArea** will do the calculation and swipe as you wish.
//


// =========================
// locations: [startX, startY, endX, endY]
const newSwipe = (driver, wd, locations) => {
  const action = new wd.TouchAction(driver)
  return action
    .press({x: locations[0], y: locations[1]})
    .wait(1000)
    .moveTo({x: locations[2], y: locations[3]})
    .release()
    .perform()
    .catch(err => console.log(err))
}

// =========================
// startPoint:  {x, y}
// direction:   up/down/left/right
const newSwipeTo = (driver, wd, startPoint, distance, direction) => {
  if (direction === 'up') {
    return newSwipe(driver, wd, [startPoint.x, startPoint.y, startPoint.x, startPoint.y - distance])  
  } else if (direction === 'down') {
    return newSwipe(driver, wd, [startPoint.x, startPoint.y, startPoint.x, startPoint.y + distance])
  } else if (direction === 'left') {
    return newSwipe(driver, wd, [startPoint.x, startPoint.y, startPoint.x - distance, startPoint.y])
  } else if (direction === 'right') {
    return newSwipe(driver, wd, [startPoint.x, startPoint.y, startPoint.x + distance, startPoint.y])
  } else {
    throw `newSwipeTo error: cannot identify direction: ${direction}`
  }
}

// =========================
// location:
//   [ { x: 100, y: 671 }, { width: 520, height: 452 } ]
// direction:   up/down/left/right
exports.newSwipeArea = (driver, wd, location, direction) => {
  let startPoint = 0
  let distance = 0
  if (direction === 'up') {
    startPoint = {
      x: location[0].x + location[1].width / 2,
      y: location[0].y + location[1].height / 2
    }
    distance = location[1].height / 2
  } else if (direction === 'down') {
    startPoint = {
      x: location[0].x + location[1].width / 2,
      y: location[0].y
    }
    distance = location[1].height / 2
  } else if (direction === 'left') {
    startPoint = {
      x: location[0].x + location[1].width,
      y: location[0].y + location[1].height / 2 
    }
    distance = location[1].width / 2
  } else if (direction === 'right') {
    startPoint = {
      x: location[0].x,
      y: location[0].y + location[1].height / 2
    }
    distance = location[1].width / 2
  } else {
    throw `newSwipeArea error: cannot identify direction: ${direction}`
  }
  return newSwipeTo(driver, wd, startPoint, distance, direction)
}