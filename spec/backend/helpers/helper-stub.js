const _ = require('lodash')

const expectedResult = {
  recordActionUrl: '#recordActionUrl',
  resourceActionUrl: '#resourceActionUrl',
}

module.exports = sinon => (
  {
    recordActionUrl: sinon.stub().returns(expectedResult.recordActionUrl),
    resourceActionUrl: sinon.stub().returns(expectedResult.resourceActionUrl),
    _,
  }
)

module.exports.expectedResult = expectedResult
