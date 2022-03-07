"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _chai = require("chai");

var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));

var _recordsTableHeader = _interopRequireDefault(require("./records-table-header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../../spec/property-json.factory');

describe('<RecordsTableHeader />', function () {
  it('renders columns for selected properties and actions', async function () {
    const property = await _factoryGirl.default.build('PropertyJSON', {
      isSortable: true
    });
    const {
      container
    } = (0, _reactTestingLibrary.render)( /*#__PURE__*/_react.default.createElement(_testContextProvider.default, null, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement(_recordsTableHeader.default, {
      properties: [property],
      titleProperty: property,
      sortBy: this.sortBy,
      direction: this.direction
    }))));
    (0, _chai.expect)(container.getElementsByTagName('td')).to.have.lengthOf(3);
  });
});