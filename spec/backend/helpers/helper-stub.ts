import sinon from 'sinon'
import ViewHelpers from '../../../src/backend/utils/view-helpers'

const expectedResult = {
  recordActionUrl: '#recordActionUrl',
  resourceActionUrl: '#resourceActionUrl',
  bulkActionUrl: '#bulkActionUrl',
  loginUrl: 'loginUrl',
  logoutUrl: 'logoutUrl',
  rootUrl: 'admin',
  assetPath: 'assetPath',
  listUrl: 'listUrl',
  dashboardUrl: 'dashboardUrl',
  pageUrl: 'pageUrl',
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
    bulkActionUrl: sinon.stub().returns(expectedResult.bulkActionUrl),
    urlBuilder: sinon.stub(),
    loginUrl: sinon.stub().returns(expectedResult.loginUrl),
    logoutUrl: sinon.stub().returns(expectedResult.logoutUrl),
    assetPath: sinon.stub().returns(expectedResult.assetPath),
    listUrl: sinon.stub().returns(expectedResult.listUrl),
    dashboardUrl: sinon.stub().returns(expectedResult.dashboardUrl),
    pageUrl: sinon.stub().returns(expectedResult.pageUrl),
  }
)

module.exports.expectedResult = expectedResult
