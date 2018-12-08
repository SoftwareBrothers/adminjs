const BaseProperty = require('@backend/adapters/base-property')

const expectedResult = {
  properties: [...Array(10)].map(() => new BaseProperty({ name: 1, type: 'string' })),
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
    properties: sinon.stub().returns(expectedResult.properties),
    name: sinon.stub().returns(expectedResult.resourceName),
    property: sinon.stub().returns(new BaseProperty({ name: 'prop', type: 'string' })),
    databaseName: sinon.stub().returns(expectedResult.databaseName),
    databaseType: sinon.stub().returns(expectedResult.databaseType),
    parent: sinon.stub().returns(expectedResult.parent),
  }
)

module.exports.expectedResult = expectedResult
