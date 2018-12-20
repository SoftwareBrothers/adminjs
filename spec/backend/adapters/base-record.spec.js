const flatten = require('flat')
const Record = require('@backend/adapters/base-record')

describe('Record', function () {
  describe('#param', function () {
    context('record with nested parameters', function () {
      beforeEach(function () {
        this.value = 'value'
        this.params = {
          nested1level: { nested2level: { nested3level: this.value } },
        }
        this.record = new Record(this.params)
      })

      it('returns nested field', function () {
        expect(this.record.param('nested1level.nested2level.nested3level')).to.equal('value')
      })
    })
  })
  describe('#constructor', function () {
    beforeEach(function () {
      this.params = {
        auth: {
          login: 'login',
        },
      }
    })

    it('returns undefined params if they are not passed to the constructor', function () {
      const record = new Record()
      expect(record.params).to.be.undefined
    })

    it('stores flatten object params', function () {
      const record = new Record(this.params)
      const expectedResult = { 'auth.login': 'login' }
      expect(record.params).to.deep.equal(expectedResult)
    })
  })
})
