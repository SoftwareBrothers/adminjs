import ViewHelpers from '../../../src/backend/utils/view-helpers/view-helpers'

const expectedResult = {
  recordActionUrl: '#recordActionUrl',
  resourceActionUrl: '#resourceActionUrl',
  bulkActionUrl: '#bulkActionUrl',
  loginUrl: 'loginUrl',
  logoutUrl: 'logoutUrl',
  rootUrl: 'admin',
  assetPath: 'assetPath',
  resourceUrl: 'resourceUrl',
  dashboardUrl: 'dashboardUrl',
  pageUrl: 'pageUrl',
  editUrl: 'editUrl',
  showUrl: 'showUrl',
  deleteUrl: 'deleteUrl',
  newUrl: 'newUrl',
  listUrl: 'listUrl',
  bulkDeleteUrl: 'bulkDeleteUrl',
}

export default (): ViewHelpers => (
  {
    options: {
      loginPath: expectedResult.loginUrl,
      logoutPath: expectedResult.logoutUrl,
      rootPath: expectedResult.rootUrl,
    },
    recordActionUrl: jest.fn().mockReturnValue(expectedResult.recordActionUrl),
    resourceActionUrl: jest.fn().mockReturnValue(expectedResult.resourceActionUrl),
    bulkActionUrl: jest.fn().mockReturnValue(expectedResult.bulkActionUrl),
    urlBuilder: jest.fn(),
    loginUrl: jest.fn().mockReturnValue(expectedResult.loginUrl),
    logoutUrl: jest.fn().mockReturnValue(expectedResult.logoutUrl),
    assetPath: jest.fn().mockReturnValue(expectedResult.assetPath),
    resourceUrl: jest.fn().mockReturnValue(expectedResult.resourceUrl),
    dashboardUrl: jest.fn().mockReturnValue(expectedResult.dashboardUrl),
    pageUrl: jest.fn().mockReturnValue(expectedResult.pageUrl),
    editUrl: jest.fn().mockReturnValue(expectedResult.editUrl),
    showUrl: jest.fn().mockReturnValue(expectedResult.showUrl),
    deleteUrl: jest.fn().mockReturnValue(expectedResult.deleteUrl),
    newUrl: jest.fn().mockReturnValue(expectedResult.newUrl),
    listUrl: jest.fn().mockReturnValue(expectedResult.listUrl),
    bulkDeleteUrl: jest.fn().mockReturnValue(expectedResult.bulkDeleteUrl),
  }
)

module.exports.expectedResult = expectedResult
