const BaseDecorator = require('@backend/utils/base-decorator')
const BaseProperty = require('@backend/adapters/base/property')


describe.only('BaseDecorator', function () {
  beforeEach(function () {
    this.properties = [...Array(10)].map(p => new BaseProperty({ name: 1, type: 'string' }))
    this.modelName = 'modelName'
    this.mockedModel = {
      properties: this.sinon.stub().returns(this.properties),
      name: this.sinon.stub().returns(this.modelName),
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
      this.decorator = new Decorator(this.mockedModel)
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

  describe('#getModelName', function () {
    it('returns model name when not ovverriden', function () {
      const decorator = new BaseDecorator(this.mockedModel)
      expect(decorator.getModelName()).to.equal(this.modelName)
    })
  })

  describe('#getListProperties', function () {
    it('returns first 5 visible properties from model when not overwriten', function () {
      this.decorator = new BaseDecorator(this.mockedModel)
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
        this.decorator = new Decorator(this.mockedModel)
      })

      it('returns given properties', function () {
        this.propertyName = 'someProperty'
        this.mockedModel.property.returns({ name: this.propertyName })
        const properties = this.decorator.getListProperties()
        expect(properties).to.have.lengthOf(3)
        expect(properties[0].name).to.equal(this.propertyName)
      })

      it('creates new property when it overwriten doesnt exist', function () {
        this.mockedModel.property.returns(null) // there are no property for given name
        const properties = this.decorator.getListProperties()
        expect(properties).to.have.lengthOf(3)
      })
    })
  })

  describe('#getValue', function () {
    it('returns value from the model when there is no override', function () {
      this.instance = { param: this.sinon.spy()}
      this.decorator = new BaseDecorator(this.mockedModel)
      this.decorator.getValue({ instance: this.instance, property: new BaseProperty({ path: 'somename' }) })
      expect(this.instance.param).to.have.been.called
    })
  })
})
