import sinon from 'sinon'
import { expect } from 'chai'

import ResourceDecorator from './resource-decorator'
import PropertyDecorator from '../property/property-decorator'
import AdminJS, { defaultOptions } from '../../../adminjs'
import resourceStub, { expectedResult } from '../../../../spec/backend/helpers/resource-stub'
import BaseResource from '../../adapters/resource/base-resource'
import BaseRecord from '../../adapters/record/base-record'
import BaseProperty from '../../adapters/property/base-property'

const translatedLabel = 'translated label'
const currentAdmin = {
  email: 'some@email.com',
  name: 'someName',
  otherValue: 'someOther-value',
}

const stubAdminJS = (): AdminJS => {
  const stubbedAdmin = sinon.createStubInstance(AdminJS)
  return Object.assign(stubbedAdmin, {
    translateLabel: sinon.stub<any, string>().returns(translatedLabel),
    translateProperty: sinon.stub<any, string>().returns('translated property'),
    translateAction: sinon.stub<any, string>().returns('translated action'),
    translateMessage: sinon.stub<any, string>().returns('translate message'),
    options: { ...defaultOptions, rootPath: '/admin' },
  })
}

describe('ResourceDecorator', function () {
  let stubbedAdmin: AdminJS
  let stubbedRecord: any
  let stubbedResource: BaseResource
  let args

  beforeEach(function () {
    stubbedRecord = sinon.stub()
    stubbedResource = resourceStub()
    stubbedResource._decorated = {
      id: () => 'resourceId',
    } as ResourceDecorator
    stubbedAdmin = stubAdminJS()
    args = {
      resource: stubbedResource, admin: stubbedAdmin,
    }
  })

  afterEach(function () {
    sinon.restore()
  })

  describe('#getResourceName', function () {
    it('returns resource when name is not specified in options', function () {
      expect(
        new ResourceDecorator({ ...args, options: {} }).getResourceName(),
      ).to.equal(translatedLabel)
    })
  })

  describe('#getNavigation', function () {
    it('returns custom name with icon when options were specified', function () {
      const options = {
        navigation: { name: 'someName', icon: 'someIcon', show: true },
      }
      expect(
        new ResourceDecorator({ ...args, options }).getNavigation(),
      ).to.deep.equal(options.navigation)
    })
  })

  describe('#getProperties', function () {
    context('all properties are visible', function () {
      beforeEach(function () {
        sinon.stub(PropertyDecorator.prototype, 'isVisible').returns(true)
      })

      it('returns first n items when limit is given', function () {
        const max = 3
        const decorator = new ResourceDecorator(args)

        expect(
          decorator.getProperties({ where: 'list', max }),
        ).to.have.lengthOf(max)
      })

      it('returns all properties when limit is not given', function () {
        const decorator = new ResourceDecorator(args)

        expect(
          decorator.getProperties({ where: 'list' }),
        ).to.have.lengthOf(expectedResult.properties.length)
      })

      it('returns only showProperties from options if they were given', function () {
        const path = expectedResult.properties[0].path()
        const decorator = new ResourceDecorator({ ...args,
          options: {
            showProperties: [path],
          } })

        expect(
          decorator.getProperties({ where: 'show' }),
        ).to.have.lengthOf(1)
      })
    })
  })

  describe('#resourceActions', function () {
    context('no action were specified in custom settings', function () {
      let decorator: ResourceDecorator

      beforeEach(function () {
        const options = {}
        decorator = new ResourceDecorator({ ...args, options })
      })

      it('returns 2 default resource actions', function () {
        const actions = decorator.resourceActions(currentAdmin)
        const [action] = actions

        expect(actions).to.have.lengthOf(2)
        expect(action).to.have.property('name', 'new')
      })
    })
  })

  describe('#getPropertyByKey', function () {
    let decorator: ResourceDecorator

    beforeEach(function () {
      decorator = new ResourceDecorator(args)
    })

    it('returns property by giving its key', function () {
      const propertyPath = expectedResult.properties[0].path()

      expect(
        decorator.getPropertyByKey(propertyPath),
      ).to.be.an.instanceof(PropertyDecorator)
    })

    it('returns null when there is no property by given key', function () {
      expect(decorator.getPropertyByKey('some-unknown-name')).to.eq(null)
    })

    it('returns mixed property', function () {
      const propertyPath = expectedResult.properties.find(p => p.type() === 'mixed')?.path()

      expect(
        decorator.getPropertyByKey(propertyPath as string),
      ).to.be.an.instanceof(PropertyDecorator)
    })

    it('returns nested property under mixed', function () {
      const property = expectedResult.properties.find(p => p.type() === 'mixed') as BaseProperty
      const nested1Property = property?.subProperties().find(p => p.type() !== 'mixed') as BaseProperty
      const path = [property.path(), nested1Property.path()].join('.')

      const decoratedProperty = decorator.getPropertyByKey(path) as PropertyDecorator

      expect(decoratedProperty).to.be.an.instanceof(PropertyDecorator)
      expect(decoratedProperty.propertyPath).to.eq(path)
    })

    it('returns nested property under 2 level nested mixed', function () {
      const property = expectedResult.properties.find(p => p.type() === 'mixed') as BaseProperty
      const nested1Property = property?.subProperties().find(p => p.type() === 'mixed') as BaseProperty
      const nested2Property = nested1Property?.subProperties()[0] as BaseProperty
      const path = [property.path(), nested1Property.path(), nested2Property.path()].join('.')

      const decoratedProperty = decorator.getPropertyByKey(path) as PropertyDecorator

      expect(decoratedProperty).to.be.an.instanceof(PropertyDecorator)
      expect(decoratedProperty.propertyPath).to.eq(path)
    })

    it('returns property when it is an array', function () {
      const arrayProperty = expectedResult.properties.find(p => p.isArray()) as BaseProperty
      // checking of a property of first item in an array
      const path = [arrayProperty.path(), '0'].join('.')

      const decoratedProperty = decorator.getPropertyByKey(path) as PropertyDecorator

      expect(decoratedProperty).to.be.an.instanceof(PropertyDecorator)
      expect(decoratedProperty.propertyPath).to.eq(arrayProperty.path())
    })

    it('returns property when it is an nested array', function () {
      const arrayProperty = expectedResult.properties
        .find(p => p.isArray() && p.type() === 'mixed') as BaseProperty
      const nested1Property = arrayProperty?.subProperties()[0] as BaseProperty

      // checking of a property of first item in an array
      const path = [arrayProperty.path(), '0', nested1Property.path()].join('.')

      const decoratedProperty = decorator.getPropertyByKey(path) as PropertyDecorator

      expect(decoratedProperty).to.be.an.instanceof(PropertyDecorator)
      expect(decoratedProperty.propertyPath).to.eq([arrayProperty.path(), nested1Property.path()].join('.'))
    })
  })

  describe('#recordAction', function () {
    it('returns default actions', function () {
      const actions = new ResourceDecorator({
        ...args, options: {},
      }).recordActions(stubbedRecord, currentAdmin)

      expect(actions).to.have.lengthOf(3)
    })

    it('shows custom actions specified by the user', function () {
      const options = { actions: { customAction: { actionType: 'record' } } }
      const actions = new ResourceDecorator({
        ...args, options,
      }).recordActions(stubbedRecord, currentAdmin)

      expect(actions).to.have.lengthOf(4)
    })

    it('hides the given action if user set isVisible to false', function () {
      const options = { actions: { show: { isVisible: false } } }
      const actions = new ResourceDecorator({
        ...args, options,
      }).recordActions(stubbedRecord, currentAdmin)

      expect(actions).to.have.lengthOf(2)
    })

    it('passes properties to isVisible when it is a function', function () {
      const someRecord = { params: { param: 'someRecord' } } as unknown as BaseRecord
      const options = { actions: { show: { isVisible: (data) => {
        // it passes current admin to the isVisible function
        expect(data.currentAdmin).to.deep.equal(currentAdmin)
        expect(data.resource.id).to.equal(stubbedResource.id)
        expect(data.action.name).to.equal('show')
        expect(data.record).to.equal(someRecord)
        return false
      } } } }
      const actions = new ResourceDecorator({
        ...args, options,
      }).recordActions(someRecord, currentAdmin)

      expect(actions).to.have.lengthOf(2)
    })
  })

  describe('#toJSON', function () {
    it('returns JSON representation of a resource', function () {
      const json = new ResourceDecorator(args).toJSON(currentAdmin)
      expect(json).to.have.keys(
        'id',
        'name',
        'navigation',
        'href',
        'actions',
        'titleProperty',
        'resourceActions',
        'listProperties',
        'editProperties',
        'showProperties',
        'filterProperties',
        'properties',
      )
    })

    it('passes current admin to the resourceActions', function () {
      const resourceActionsSpy = sinon.spy(ResourceDecorator.prototype, 'resourceActions')

      new ResourceDecorator(args).toJSON(currentAdmin)

      expect(resourceActionsSpy).to.have.been.calledWith(currentAdmin)
    })
  })
})
