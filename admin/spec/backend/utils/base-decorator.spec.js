const BaseDecorator = require('@backend/utils/base-decorator')
const BaseProperty = require('@backend/adapters/base/property')

describe('BaseDecorator', function () {
  beforeEach(function () {
    this.properties = [...Array(10)].map(p => new BaseProperty({ name: 1, type: 'string' }))
    this.resourceName = 'resourceName'
    this.databaseName = 'databaseName'
    this.databaseType = 'mongodb'
    this.modkedParent = {
      name: this.databaseName,
      icon: `icon-${this.databaseType}`
    }
    this.mockedResource = {
      properties: this.sinon.stub().returns(this.properties),
      name: this.sinon.stub().returns(this.resourceName),
      property: this.sinon.stub().returns(new BaseProperty({ name: 'prop', type: 'string' })),
      databaseName: this.sinon.stub().returns(this.databaseName),
      databaseType: this.sinon.stub().returns(this.databaseType),
      parent: this.sinon.stub().returns(this.modkedParent),
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
    it('returns resource name when not overriden', function () {
      const decorator = new BaseDecorator(this.mockedResource)
      expect(decorator.getResourceName()).to.equal(this.resourceName)
    })
  })

  describe('#getParent', function() {
    it('return parent databaseName', function () {
      const decorator = new BaseDecorator(this.mockedResource)
      expect(decorator.getParent()).to.contain(this.modkedParent)
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

  describe('#getRecordActions', function() {
    beforeEach(function() {
      this.mockedHelper = {
        showRecordUrl: this.sinon.stub().returns('url'),
        editRecordUrl: this.sinon.stub().returns('url'),
        deleteRecordUrl: this.sinon.stub().returns('url'),
        customRecordActionUrl: this.sinon.stub().returns('url'),
      }
    })

    context('user didnt override default actions', function() {
      beforeEach(function() {
        this.decorator = new BaseDecorator(this.mockedResource)
      })

      it('returns default methods as an object', function() {
        const ret = this.decorator.getRecordActions(this.mockedHelper)
        expect(ret).to.have.keys('edit', 'show', 'remove')
      })
    })

    context('user hidden edit action', function() {
      beforeEach(function() {
        class Decorator extends BaseDecorator {
          constructor(params) {
            super(params)
            this.recordActions = ['show', 'remove']
          }
        }
        this.decorator = new Decorator(this.mockedResource)
        this.ret = this.decorator.getRecordActions(this.mockedHelper)
      })

      it('returns object containing declared actions', function() {
        expect(this.ret).to.have.keys('show', 'remove')
      })

      it('returns all fields for declared actions', function() {
        expect(this.ret).to.deep.include({
          show: {
            path: 'url',
            icon: 'info',
            label: 'Info' 
          },
          remove: {
            path: 'url',
            icon: 'trash',
            label: 'Remove' 
          }
        })
      })
    })
    
    context('user created new action', function() {
      beforeEach(function() {
        class Decorator extends BaseDecorator {
          constructor(params) {
            super(params)
            this.recordActions = ['show', 'remove', 'edit', {
              id: 'publish',
              icon: 'share',
              label: 'Publish',
              action: (request, response, view) => {
                const { method } = request
                if(method === 'POST') {
                  return 'Some content or form which you want to place here' 
                } else {
                  return 'PUBLISH ACTION WORKS'
                }
              }
            }]
          }
        }
        this.decorator = new Decorator(this.mockedResource)
        this.ret = this.decorator.getRecordActions(this.mockedHelper)
      })

      it('returns object containing new action', function() {
        expect(this.ret).to.have.keys('show', 'remove', 'edit', 'publish')
      })

      it('returns custom action object with path', function() {
        expect(this.ret.publish).to.have.property('path')
      })
    })
  })
})
