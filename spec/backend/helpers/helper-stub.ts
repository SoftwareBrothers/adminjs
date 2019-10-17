import * as _ from 'lodash'
import sinon from 'sinon'
import ViewHelpers from '../../../src/backend/utils/view-helpers'

const expectedResult = {
  recordActionUrl: '#recordActionUrl',
  resourceActionUrl: '#resourceActionUrl',
  loginUrl: 'loginUrl',
  logoutUrl: 'logoutUrl',
  rootUrl: 'admin',
  assetPath: 'assetPath',
  listUrl: 'listUrl',
  dashboardUrl: 'dashboardUrl',
}

export default (): ViewHelpers => (
  {
    options: {
      loginPath: expectedResult.loginUrl,
      logoutPath: expectedResult.logoutUrl,
      rootPath: expectedResult.rootUrl,
    },
    recordActionUrl: sinon.stub().returns(expectedResult.recordActionUrl),
    resourceActionUrl: sinon.stub().returns(expectedResult.resourceActionUrl),
    urlBuilder: sinon.stub(),
    loginUrl: sinon.stub().returns(expectedResult.loginUrl),
    logoutUrl: sinon.stub().returns(expectedResult.logoutUrl),
    assetPath: sinon.stub().returns(expectedResult.assetPath),
    listUrl: sinon.stub().returns(expectedResult.listUrl),
    dashboardUrl: sinon.stub().returns(expectedResult.dashboardUrl),
  }
)

module.exports.expectedResult = expectedResult
