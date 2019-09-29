import Record from './base-record'

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

      it('returns deepest field when all up-level keys are given', function () {
        expect(this.record.param('nested1level.nested2level.nested3level')).to.equal('value')
      })

      it('returns object when all up-level keys are given except one', function () {
        expect(this.record.param('nested1level.nested2level')).to.deep.equal({
          nested3level: this.value,
        })
      })

      it('returns object when only first level key is given', function () {
        expect(this.record.param('nested1level')).to.deep.equal({
          nested2level: { nested3level: this.value },
        })
      })
    })
  })
  describe('#constructor', function () {
    it('returns empty object if params are not passed to the constructor', function () {
      const record = new Record()
      expect(record.params).to.deep.equal({})
    })

    it('stores flatten object params', function () {
      expect(new Record({ auth: { login: 'login' } }).params).to.deep.equal({ 'auth.login': 'login' })
    })
  })
  describe('#storeParams', function () {
    beforeEach(function () {
      this.params = {
        auth: {
          login: 'login',
        },
        name: 'Tom',
      }
      this.payload = {
        'auth.login': 'new login',
      }
    })

    it('stores given data property in a record params', function () {
      const record = new Record(this.params)
      const expectedResult = { 'auth.login': 'new login', name: 'Tom' }
      record.storeParams(this.payload)
      expect(record.params).to.deep.equal(expectedResult)
    })
  })
})
