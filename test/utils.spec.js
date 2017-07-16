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

  
  describe('removeLeadingZero', () => {
    it('should remove leading zero when it is a string', () => {
      const str = utils.removeLeadingZero("00193")
      expect(str).to.equal('193')
    })

    it('leave it when it is a number', () => {
      const num = utils.removeLeadingZero(00193)
      expect(num).to.equal(00193)
    })
  })


  describe('monthAbbrToNum', () => {
    it('should return month as num given an English word', () => {
      const str1 = utils.monthAbbrToNum('Jan')
      const str2 = utils.monthAbbrToNum('Feb')
      const str3 = utils.monthAbbrToNum('Mar')
      const str4 = utils.monthAbbrToNum('Apr')
      const str5 = utils.monthAbbrToNum('May')
      const str6 = utils.monthAbbrToNum('Jun')
      const str7 = utils.monthAbbrToNum('Jul')      
      const str8 = utils.monthAbbrToNum('Aug')      
      const str9 = utils.monthAbbrToNum('Sep')
      const str10 = utils.monthAbbrToNum('Oct')
      const str11 = utils.monthAbbrToNum('Nov')
      const str12 = utils.monthAbbrToNum('Dec')
      expect(str1).to.equal('1')      
      expect(str2).to.equal('2')      
      expect(str3).to.equal('3')      
      expect(str4).to.equal('4')
      expect(str5).to.equal('5')      
      expect(str6).to.equal('6')      
      expect(str7).to.equal('7')      
      expect(str8).to.equal('8')
      expect(str9).to.equal('9')      
      expect(str10).to.equal('10')      
      expect(str11).to.equal('11')      
      expect(str12).to.equal('12')
    })

    it('should ignore upcase and lower case of input month abbr', () => {
      const str = utils.monthAbbrToNum('JUL')
      expect(str).to.equal('7')
    })
  })

  describe('monthNumToWord', () => {
    it('should return upper case abbr give month as number', () => {
      const str1 = utils.monthNumToWord(1)
      const str2 = utils.monthNumToWord(2)
      const str3 = utils.monthNumToWord(3)
      const str4 = utils.monthNumToWord(4)
      const str5 = utils.monthNumToWord(5)
      const str6 = utils.monthNumToWord(6)
      const str7 = utils.monthNumToWord(7)
      const str8 = utils.monthNumToWord(8)
      const str9 = utils.monthNumToWord(9)
      const str10 = utils.monthNumToWord(10)
      const str11 = utils.monthNumToWord(11)
      const str12 = utils.monthNumToWord(12)
      expect(str1).to.equal('January')
      expect(str2).to.equal('February')
      expect(str3).to.equal('March')
      expect(str4).to.equal('April')
      expect(str5).to.equal('May')
      expect(str6).to.equal('June')
      expect(str7).to.equal('July')
      expect(str8).to.equal('August')
      expect(str9).to.equal('September')
      expect(str10).to.equal('October')
      expect(str11).to.equal('November')
      expect(str12).to.equal('December')
    })
  })
})



