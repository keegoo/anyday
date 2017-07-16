var expect = require('chai').expect
var utils = require('../src/utils')

describe('utils', () => {
  describe('expendElementPrefix', () => {
    it('should expend \'android.widget.\' to xpath', () => {
      const str = utils.expendElementPrefix('//ListView/TextView')
      expect(str).to.equal('//android.widget.ListView/android.widget.TextView')
    })

    it('should leave it if not start with //', () => {
      const str = utils.expendElementPrefix('ListView')
      expect(str).to.equal('ListView')
    })

    it('should add "android.view" to "View"', () => {
      const str = utils.expendElementPrefix('//ListView/View')
      expect(str).to.equal('//android.widget.ListView/android.view.View')
    })

    it('could handle situations when View[@text="July"]', () => {
      const str = utils.expendElementPrefix('//ListView/View/View[@text="July"]')
      expect(str).to.equal('//android.widget.ListView/android.view.View/android.view.View[@text="July"]')
    })
  })
})