import sinon from 'sinon'

import BaseProperty from '../../../src/backend/adapters/base-property'
import BaseResource from '../../../src/backend/adapters/base-resource'
import ResourceDecorator from '../../../src/backend/decorators/resource-decorator'

/**
 * returns properties with following absolute paths:
 * - normal: number
 * - nested: mixed
 * - nested.normal: string
 * - nested.nested: mixed
 * - nested.nested.normalInner: string
 * - arrayed: string (array)
 * - arrayedMixed: mixed (array)
 * - arrayedMixed.arrayParam: string
 *
 * @private
 */
const buildProperties = (): Array<BaseProperty> => {
  const normalProperty = new BaseProperty({ path: 'normal', type: 'number' }) as any
  const nestedProperty = new BaseProperty({ path: 'nested', type: 'mixed' }) as any
  const nested2Property = new BaseProperty({ path: 'nested', type: 'mixed' }) as any
  const arrayProperty = new BaseProperty({ path: 'arrayed', type: 'string' }) as any
  const arrayMixedProperty = new BaseProperty({ path: 'arrayedMixed', type: 'mixed' }) as any
  arrayProperty.isArray = (): boolean => true
  arrayMixedProperty.isArray = (): boolean => true

  nestedProperty.subProperties = (): Array<BaseProperty> => [
    new BaseProperty({ path: 'normal', type: 'string' }),
    nested2Property,
  ]
  nested2Property.subProperties = (): Array<BaseProperty> => [
    new BaseProperty({ path: 'normalInner', type: 'string' }),
  ]
  arrayMixedProperty.subProperties = (): Array<BaseProperty> => [
    new BaseProperty({ path: 'arrayParam', type: 'string' }),
  ]

  return [normalProperty, nestedProperty, arrayProperty, arrayMixedProperty]
}


export const expectedResult = {
  id: 'someID',
  properties: buildProperties(),
  resourceName: 'resourceName',
  databaseName: 'databaseName',
  databaseType: 'mongodb',
  parent: {
    name: 'databaseName',
    icon: 'icon-mongodb',
  },
}

export default (): BaseResource => ({
  _decorated: {} as ResourceDecorator,
  id: sinon.stub().returns(expectedResult.id),
  properties: sinon.stub().returns(expectedResult.properties),
  property: sinon.stub().returns(new BaseProperty({ path: 'prop', type: 'string' })),
  databaseName: sinon.stub().returns(expectedResult.databaseName),
  databaseType: sinon.stub().returns(expectedResult.databaseType),
  count: sinon.stub(),
  find: sinon.stub(),
  populate: sinon.stub(),
  findOne: sinon.stub(),
  findMany: sinon.stub(),
  build: sinon.stub(),
  create: sinon.stub(),
  update: sinon.stub(),
  delete: sinon.stub(),
  assignDecorator: sinon.stub(),
  decorate: sinon.stub(),
})
