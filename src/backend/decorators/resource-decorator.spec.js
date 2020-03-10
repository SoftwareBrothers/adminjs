import sinon from 'sinon'

import ResourceDecorator from './resource-decorator'
import PropertyDecorator from './property-decorator'
import ConfigurationError from '../utils/configuration-error'
import AdminBro from '../../admin-bro'
import resourceStub, { expectedResult } from '../../../spec/backend/helpers/resource-stub'

describe('ResourceDecorator', function () {
  beforeEach(function () {
    this.translatedLabel = 'translated label'
    this.currentAdmin = {
      email: 'some@email.com',
      name: 'someName',
      otherValue: 'someOther-value',
    }
    this.stubbedRecord = this.sinon.stub()
    this.stubbedResource = resourceStub(this.sinon)
    this.stubbedResource._decorated = {
      id: () => 'resourceId',
    }
    this.stubbedAdmin = this.sinon.createStubInstance(AdminBro)
    this.stubbedAdmin.translateLabel = sinon.stub().returns(this.translatedLabel)
    this.stubbedAdmin.translateProperty = sinon.stub().returns('translated property')
    this.stubbedAdmin.translateAction = sinon.stub().returns('translated action')
    this.stubbedAdmin.translateMessage = sinon.stub().returns('translate message')
    this.stubbedAdmin.options = { rootPath: '/admin' }
    this.args = { resource: this.stubbedResource, admin: this.stubbedAdmin }
  })

  describe('#getResourceName', function () {
    it('returns resource when name is not specified in options', function () {
      expect(
        new ResourceDecorator({ ...this.args, options: {} }).getResourceName(),
      ).to.equal(this.translatedLabel)
    })
  })

  describe('#getParent', function () {
    it('returns database name with its icon when no options were specified', function () {
      expect(
        new ResourceDecorator({ ...this.args, options: {} }).getParent(),
      ).to.deep.equal({
        name: expectedResult.databaseName,
        icon: `icon-${expectedResult.databaseType}`,
      })
    })
    it('returns custom name with icon when options were specified', function () {
      const options = {
        parent: { name: 'someName', icon: 'i-icon-some' },
      }
      expect(
        new ResourceDecorator({ ...this.args, options }).getParent(),
      ).to.deep.equal(options.parent)
    })
  })

  describe('#decorateProperties', function () {
    beforeEach(function () {
      this.PropertyDecoratorSpy = this.sinon.spy(PropertyDecorator)
      this.defaultProperties = expectedResult.properties
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
        ).to.have.lengthOf(expectedResult.properties.length)
      })

      it('returns only showProperties from options if they were given', function () {
        const path = expectedResult.properties[0].path()
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

      it('returns 2 default resource actions', function () {
        const actions = this.decorator.resourceActions(this.currentAdmin)
        expect(actions).to.have.lengthOf(2)
        const [action] = actions
        expect(action).to.have.property('name', 'new')
      })
    })
  })

  describe('#getPropertyByKey', function () {
    beforeEach(function () {
      this.decorator = new ResourceDecorator({ ...this.args })
    })

    it('returns property by giving its key', function () {
      this.propertyPath = expectedResult.properties[0].path()
      expect(
        this.decorator.getPropertyByKey(this.propertyPath),
      ).to.be.an.instanceof(PropertyDecorator)
    })

    it('throws error when there is no property by given key', function () {
      expect(() => {
        this.decorator.getPropertyByKey('some-unknown-name')
      }).to.throw(ConfigurationError)
    })
  })

  describe('#recordAction', function () {
    it('returns default actions', function () {
      const options = {}
      const actions = new ResourceDecorator({
        ...this.args, options,
      }).recordActions(this.stubbedRecord, this.currentAdmin)
      expect(actions).to.have.lengthOf(3)
    })

    it('shows custom actions specified by the user', function () {
      const options = { actions: { customAction: { actionType: ['record'] } } }
      const actions = new ResourceDecorator({
        ...this.args,
        options,
      }).recordActions(this.stubbedRecord, this.currentAdmin)
      expect(actions).to.have.lengthOf(4)
    })

    it('hides the given action if user set isVisible to false', function () {
      const options = { actions: { show: { isVisible: false } } }
      const actions = new ResourceDecorator({
        ...this.args,
        options,
      }).recordActions(this.stubbedRecord, this.currentAdmin)
      expect(actions).to.have.lengthOf(2)
    })

    it('passes properties to isVisible when it is a function', function () {
      const options = { actions: { show: { isVisible: (data) => {
        // it passes current admin to the isVisible function
        expect(data.currentAdmin).to.deep.equal(this.currentAdmin)
        expect(data.resource.id).to.equal(this.stubbedResource.id)
        expect(data.action.name).to.equal('show')
        expect(data.record).to.equal('someRecord')
        return false
      } } } }
      const actions = new ResourceDecorator({
        ...this.args,
        options,
      }).recordActions('someRecord', this.currentAdmin)
      expect(actions).to.have.lengthOf(2)
    })
  })

  describe('#toJSON', function () {
    it('returns JSON representation of a resource', function () {
      const json = new ResourceDecorator(this.args).toJSON(this.currentAdmin)
      expect(json).to.have.keys(
        'id',
        'name',
        'parent',
        'href',
        'actions',
        'titleProperty',
        'resourceActions',
        'listProperties',
        'editProperties',
        'showProperties',
        'filterProperties',
      )
    })

    it('passes current admin to the resourceActions', function () {
      const resourceActionsSpy = this.sinon.spy(ResourceDecorator.prototype, 'resourceActions')

      new ResourceDecorator(this.args).toJSON(this.currentAdmin)

      expect(resourceActionsSpy).to.have.been.calledWith(this.currentAdmin)
    })
  })
})
