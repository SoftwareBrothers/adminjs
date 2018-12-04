const Record = require('@backend/adapters/base/record')

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

  describe('#title', function () {
    it('returns one of title-ish field when present', function () {
      
    })
  })
})
