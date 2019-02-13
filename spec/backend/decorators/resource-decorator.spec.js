const ResourceDecorator = require('@backend/decorators/resource-decorator')
const PropertyDecorator = require('@backend/decorators/property-decorator')
const AdminBro = require('@root/src/admin-bro')
const resourceStub = require('../helpers/resource-stub')

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

  describe('#getListProperties', function () {
    it('returns first DEFAULT_MAX_ITEMS_IN_LIST items', function () {
      this.sinon.stub(PropertyDecorator.prototype, 'isVisible').returns(true)
      this.decorator = new ResourceDecorator(this.args)
      expect(
        this.decorator.getListProperties(),
      ).to.have.lengthOf(ResourceDecorator.DEFAULT_MAX_ITEMS_IN_LIST)
    })
  })

  describe('#customHeadScripts', function () {
    it('returns list of all custom headers when they were defined as a string', function () {
      const scripts = ['http://sth.com']
      const styles = ['http://sth.css']
      const options = { properties: { newProp: { render: { head: { scripts, styles } } } } }
      const headScripts = new ResourceDecorator({ ...this.args, options }).customHeadScripts()
      expect(headScripts.scripts).to.deep.equal(scripts)
      expect(headScripts.styles).to.deep.equal(styles)
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
})
