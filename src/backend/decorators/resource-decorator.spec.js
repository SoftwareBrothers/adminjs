const ResourceDecorator = require('./resource-decorator')
const PropertyDecorator = require('./property-decorator')
const ConfigurationError = require('../utils/configuration-error')
const AdminBro = require('../../admin-bro')
const resourceStub = require('../../../spec/backend/helpers/resource-stub')

describe('ResourceDecorator', function () {
  beforeEach(function () {
    this.stubbedResource = resourceStub(this.sinon)
    this.stubbedAdmin = this.sinon.createStubInstance(AdminBro)
    this.stubbedAdmin.options = {}
    this.args = { resource: this.stubbedResource, admin: this.stubbedAdmin }
  })

  describe('#getResourceName', function () {
    it('returns resource when name is not specified in options', function () {
      expect(
        new ResourceDecorator({ ...this.args, options: {} }).getResourceName(),
      ).to.equal(resourceStub.expectedResult.resourceName)
    })

    it('returns resource when name is specified in options', function () {
      const name = 'newName'
      expect(
        new ResourceDecorator({ ...this.args, options: { name } }).getResourceName(),
      ).to.equal(name)
    })
  })

  describe('#getParent', function () {
    it('returns database name with its icon when no options were specified', function () {
      expect(
        new ResourceDecorator({ ...this.args, options: {} }).getParent(),
      ).to.deep.equal({
        name: resourceStub.expectedResult.databaseName,
        icon: `icon-${resourceStub.expectedResult.databaseType}`,
      })
    })
    it('returns custom name with icon when options were specified', function () {
      const options = {
        parent: { name: 'somename', icon: 'i-icon-some' },
      }
      expect(
        new ResourceDecorator({ ...this.args, options }).getParent(),
      ).to.deep.equal(options.parent)
    })
  })

  describe('#decorateProperties', function () {
    beforeEach(function () {
      this.PropertyDecoratorSpy = this.sinon.spy(PropertyDecorator)
      this.defaultProperties = resourceStub.expectedResult.properties
      this.originalPropertyName = this.defaultProperties[1].name()
      this.defaultPropertyName = this.defaultProperties[0].name()
      this.defaultPropertyOptions = { enable: false, isSortable: false }
      this.customPropertyOptions = { enable: true, sortable: false }
      this.options = {
        properties: {
          [this.defaultPropertyName]: this.defaultPropertyOptions,
          newProperty: this.customPropertyOptions,
        },
      }
      this.decorator = new ResourceDecorator({ ...this.args, options: this.options })
    })

    it('decorates all default properties - default and newProperty', function () {
      expect(
        Object.keys(this.decorator.properties),
      ).to.have.lengthOf(this.defaultProperties.length + 1)
    })

    it('returns default property with options', function () {
      expect(this.decorator.properties[this.defaultPropertyName].options).to.deep.equal(
        this.defaultPropertyOptions,
      )
    })

    it('returns custom property with options', function () {
      expect(this.decorator.properties.newProperty.options).to.deep.equal(
        this.customPropertyOptions,
      )
    })

    it('does not pass options where there were not given', function () {
      expect(this.decorator.properties[this.originalPropertyName].options).to.deep.equal({})
    })
  })

  describe('#getProperties', function () {
    context('all properties are visible', function () {
      beforeEach(function () {
        this.sinon.stub(PropertyDecorator.prototype, 'isVisible').returns(true)
      })

      it('returns first n items when limit is given', function () {
        const max = 3
        this.decorator = new ResourceDecorator(this.args)
        expect(
          this.decorator.getProperties({ where: 'list', max }),
        ).to.have.lengthOf(max)
      })

      it('returns all properties when limit is not given', function () {
        this.decorator = new ResourceDecorator(this.args)
        expect(
          this.decorator.getProperties({ where: 'list' }),
        ).to.have.lengthOf(resourceStub.expectedResult.properties.length)
      })

      it('returns only showProperties from options if they were given', function () {
        const path = resourceStub.expectedResult.properties[0].path()
        this.decorator = new ResourceDecorator({
          ...this.args,
          options: { showProperties: [path] },
        })
        expect(
          this.decorator.getProperties({ where: 'show' }),
        ).to.have.lengthOf(1)
      })
    })
  })

  describe('#resourceActions', function () {
    context('no action were specified in custom settings', function () {
      beforeEach(function () {
        const options = {}
        this.decorator = new ResourceDecorator({ ...this.args, options })
      })

      it('returns one default resource action', function () {
        expect(this.decorator.resourceActions()).to.have.lengthOf(1)
        const action = this.decorator.resourceActions()[0]
        expect(action).to.have.property('name', 'new')
      })
    })
  })

  describe('#getPropertyByKey', function () {
    beforeEach(function () {
      this.decorator = new ResourceDecorator({ ...this.args })
    })

    it('returns property by giving its key', function () {
      this.propertyPath = resourceStub.expectedResult.properties[0].path()
      expect(
        this.decorator.getPropertyByKey(this.propertyPath),
      ).to.be.an.instanceof(PropertyDecorator)
    })

    it('throws error when ther is no property by given key', function () {
      expect(() => {
        this.decorator.getPropertyByKey('some-unknown-name')
      }).to.throw(ConfigurationError)
    })
  })

  describe('#recordAction', function () {
    it('returns default actions', function () {
      const options = {}
      const actions = new ResourceDecorator({ ...this.args, options }).recordActions()
      expect(actions).to.have.lengthOf(3)
    })

    it('shows custom actions specified by the user', function () {
      const options = { actions: { customAction: { actionType: ['record'] } } }
      const actions = new ResourceDecorator({ ...this.args, options }).recordActions()
      expect(actions).to.have.lengthOf(4)
    })

    it('hides the given action if user set isVisible to false', function () {
      const options = { actions: { show: { isVisible: false } } }
      const actions = new ResourceDecorator({ ...this.args, options }).recordActions()
      expect(actions).to.have.lengthOf(2)
    })

    it('hides the given action if user set isVisible to function returning false', function () {
      const options = { actions: { show: { isVisible: () => false } } }
      const actions = new ResourceDecorator({ ...this.args, options }).recordActions()
      expect(actions).to.have.lengthOf(2)
    })
  })

  describe('#toJSON', function () {
    it('returns JSON representation of a resource', function () {
      const json = new ResourceDecorator(this.args).toJSON()
      expect(json).to.have.keys(
        'id',
        'name',
        'parent',
        'href',
        'titleProperty',
        'resourceActions',
        'recordActions',
        'listProperties',
        'editProperties',
        'showProperties',
        'filterProperties',
      )
    })
  })
})
