"use strict";

var _react = _interopRequireDefault(require("react"));

var _sinon = _interopRequireDefault(require("sinon"));

var _chai = require("chai");

var _lodash = _interopRequireDefault(require("lodash"));

var _i18next = _interopRequireDefault(require("i18next"));

var _reactTestingLibrary = require("react-testing-library");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _store = _interopRequireDefault(require("../../store/store"));

var _recordAction = _interopRequireDefault(require("./record-action"));

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _testContextProvider = _interopRequireDefault(require("../spec/test-context-provider"));

var _factory = _interopRequireDefault(require("../spec/factory"));

var TranslateFunctionsFactory = _interopRequireWildcard(require("../../../utils/translate-functions.factory"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultStore = {
  paths: {}
};

const renderSubject = (store = {}, location) => {
  const path = '/resources/:resourceId/records/:recordId/:actionName';

  const storeWithDefault = _lodash.default.merge(defaultStore, store);

  const renderResult = (0, _reactTestingLibrary.render)( /*#__PURE__*/_react.default.createElement(_testContextProvider.default, {
    location: location
  }, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.default)(storeWithDefault)
  }, /*#__PURE__*/_react.default.createElement(_reactRouter.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
    path: path,
    exact: true,
    component: _recordAction.default
  })))));
  return renderResult;
};

describe('<RecordAction />', function () {
  let record;
  beforeEach(async function () {
    record = await _factory.default.build('RecordJSON.total');

    _sinon.default.stub(TranslateFunctionsFactory, 'createFunctions').returns({
      translateMessage: _sinon.default.stub().returns('someMessage')
    });

    _sinon.default.stub(_apiClient.default, 'getBaseUrl').returns('/admin');

    _sinon.default.stub(_i18next.default, 'exists').returns(false);

    _sinon.default.stub(_apiClient.default.prototype, 'recordAction').resolves({
      data: {
        record
      }
    });
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  it('renders 404 when there is no resource', async function () {
    const {
      findByTestId
    } = renderSubject({}, '/resources/someResource/records/1234/show');
    const errorBox = await findByTestId('NoResourceError');
    (0, _chai.expect)(errorBox).not.to.be.undefined;
  });
});