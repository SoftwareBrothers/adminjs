const Instance = require('@backend/adapters/mongoose/instance')

describe('Instance', function () {
  describe('.flattenParams', function () {
    it('flattens the object', function () {
      this.object = {
        param1: 'param1 value',
        param2: {
          nested1: 'nested1 value',
          nested2: {
            nested3: 'aloha',
          },
        },
      }
      const ret = Instance.flattenParams(this.object)
      expect(ret).to.have.all.keys({
        param1: 'param1 value',
        'param2.nested1': 'nested1 value',
        'param2.nested2.nested3': 'nested1 value',
      })
    })
  })

  describe('.unflattenParams', function () {
    it('unflattens the object', function () {
      this.object = {
        param1: 'param1 value',
        'param2.nested1': 'nested1 value',
        'param2.nested2.nested3': 'nested1 value',
      }
      const ret = Instance.unflattenParams(this.object)
      expect(ret).to.have.all.keys({
        param1: 'param1 value',
        param2: {
          nested1: 'nested1 value',
          nested2: {
            nested3: 'aloha',
          },
        },
      })
    })
  })

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
