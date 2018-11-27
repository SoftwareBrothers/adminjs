const Instance = require('@backend/adapters/mongoose/instance')

describe('Instance', function () {
  describe('#param', function () {
    context('instance with nested parameters', function () {
      beforeEach(function () {
        this.value = 'value'
        this.params = {
          nested1level: { nested2level: { nested3level: this.value } },
        }
        this.instance = new Instance(this.params)
      })

      it('returns nested field', function () {
        expect(this.instance.param('nested1level.nested2level.nested3level')).to.equal('value')
      })
    })
  })
})
