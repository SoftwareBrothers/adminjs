const BaseDecorator = require('@backend/utils/base-decorator')
const BaseProperty = require('@backend/adapters/base/property')


describe('BaseDecorator', function () {
  beforeEach(function () {
    this.properties = [...Array(10)].map(p => new BaseProperty({ name: 1, type: 'string' }))
    this.resourceName = 'resourceName'
    this.mockedResource = {
      properties: this.sinon.stub().returns(this.properties),
      name: this.sinon.stub().returns(this.resourceName),
      property: this.sinon.stub().returns(new BaseProperty({ name: 'prop', type: 'string' })),
    }
  })

  describe('#invokeOrGet', function () {
    beforeEach(function () {
      class Decorator extends BaseDecorator {
        constructor(params) {
          super(params)
          this.overwritenProperty = 'overwritenPropertyValue'
        }
        overwritenFunction() { return 'overwritenFunctionValue' }
      }
      this.decorator = new Decorator(this.mockedResource)
    })

    it('returns null when there is no override', function () {
      expect(this.decorator.invokeOrGet('someUnknowProperty')).to.equal(undefined)
    })

    it('executes property when its a function', function () {
      expect(this.decorator.invokeOrGet('overwritenProperty')).to.equal('overwritenPropertyValue')
    })

    it('returns property when it is not a function', function () {
      expect(this.decorator.invokeOrGet('overwritenFunction')).to.equal('overwritenFunctionValue')
    })
  })

  describe('#getResourceName', function () {
    it('returns resource name when not ovverriden', function () {
      const decorator = new BaseDecorator(this.mockedResource)
      expect(decorator.getResourceName()).to.equal(this.resourceName)
    })
  })

  describe('#getListProperties', function () {
    it('returns first 5 visible properties from resource when not overwriten', function () {
      this.decorator = new BaseDecorator(this.mockedResource)
      expect(this.decorator.getListProperties()).to.have.lengthOf(5)
    })

    context('listProperties is overwriten', function () {
      beforeEach(function () {
        class Decorator extends BaseDecorator {
          constructor(params) {
            super(params)
            this.listProperties = ['prop1', 'prop2', 'prop3']
          }
        }
        this.decorator = new Decorator(this.mockedResource)
      })

      it('returns given properties', function () {
        this.propertyName = 'someProperty'
        this.mockedResource.property.returns({ name: this.propertyName })
        const properties = this.decorator.getListProperties()
        expect(properties).to.have.lengthOf(3)
        expect(properties[0].name).to.equal(this.propertyName)
      })

      it('creates new property when it overwriten doesnt exist', function () {
        this.mockedResource.property.returns(null) // there are no property for given name
        const properties = this.decorator.getListProperties()
        expect(properties).to.have.lengthOf(3)
      })
    })
  })

  describe('#getValue', function () {
    it('returns value from the resource when there is no override', function () {
      this.record = { param: this.sinon.spy() }
      this.decorator = new BaseDecorator(this.mockedResource)
      this.decorator.getValue({ record: this.record, property: new BaseProperty({ path: 'somename' }) })
      expect(this.record.param).to.have.been.called
    })
  })
})
