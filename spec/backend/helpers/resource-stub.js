const BaseProperty = require('../../../src/backend/adapters/base-property')

const expectedResult = {
  id: 'someID',
  properties: [...Array(10)].map((a, i) => new BaseProperty({
    path: `property.${i}`, type: 'string',
  })),
  resourceName: 'resourceName',
  databaseName: 'databaseName',
  databaseType: 'mongodb',
  parent: {
    name: 'databaseName',
    icon: 'icon-mongodb',
  },
}

module.exports = sinon => (
  {
    id: sinon.stub().returns(expectedResult.id),
    properties: sinon.stub().returns(expectedResult.properties),
    name: sinon.stub().returns(expectedResult.resourceName),
    property: sinon.stub().returns(new BaseProperty({ path: 'prop', type: 'string' })),
    databaseName: sinon.stub().returns(expectedResult.databaseName),
    databaseType: sinon.stub().returns(expectedResult.databaseType),
    parent: sinon.stub().returns(expectedResult.parent),
  }
)

module.exports.expectedResult = expectedResult
