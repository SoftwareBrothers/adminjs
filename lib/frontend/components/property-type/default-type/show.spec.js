"use strict";

var _react = _interopRequireDefault(require("react"));

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _chai = require("chai");

var _reactTestingLibrary = require("react-testing-library");

var _show = _interopRequireDefault(require("./show"));

var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));

require("../../spec/resource-json.factory");

require("../../spec/record-json.factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderTestSubject = (property, record, resource) => (0, _reactTestingLibrary.render)( /*#__PURE__*/_react.default.createElement(_testContextProvider.default, null, /*#__PURE__*/_react.default.createElement(_show.default, {
  property: property,
  record: record,
  resource: resource
})));

describe('<PropertyType.Default.Show />', function () {
  let resource;
  let property;
  let record;
  beforeEach(async function () {
    property = await _factoryGirl.default.build('PropertyJSON');
    resource = await _factoryGirl.default.build('ResourceJSON');
  });
  it('renders regular value when it is just a string', async function () {
    record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [property.path]: 'some Value'
      }
    });
    const {
      findByText
    } = await renderTestSubject(property, record, resource);
    const value = await findByText(record.params[property.path]);
    (0, _chai.expect)(value).not.to.be.null;
  });
  it('renders 0 when value is a 0', async function () {
    record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [property.path]: 0
      }
    });
    const {
      findByText
    } = await renderTestSubject(property, record, resource);
    const value = await findByText(record.params[property.path].toString());
    (0, _chai.expect)(value).not.to.be.null;
  });
});