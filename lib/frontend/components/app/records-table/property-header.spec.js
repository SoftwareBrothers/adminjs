"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _chai = require("chai");

var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));

var _propertyHeader = _interopRequireDefault(require("./property-header"));

require("../../spec/property-json.factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderSubject = (property, sortBy, sortDirection) => (0, _reactTestingLibrary.render)( /*#__PURE__*/_react.default.createElement(_testContextProvider.default, null, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement(_propertyHeader.default, {
  property: property,
  titleProperty: property,
  sortBy: sortBy,
  direction: sortDirection
}))))));

describe('<PropertyHeader />', function () {
  const direction = 'desc';
  const sortBy = 'otherProperty';
  let property;
  beforeEach(async function () {
    property = await _factoryGirl.default.build('PropertyJSON', {
      isSortable: true
    });
  });
  context('render not selected but searchable field', function () {
    it('renders a label', async function () {
      const {
        findAllByText
      } = renderSubject(property, sortBy, direction);
      const label = await findAllByText(property.label);
      (0, _chai.expect)(label).to.have.lengthOf(1);
    });
    it('wraps it within a link with an opposite direction', function () {
      const {
        container
      } = renderSubject(property, sortBy, direction);
      const a = container.querySelector('a');
      const href = a && a.getAttribute('href') || '';
      const query = new URLSearchParams(href.replace('/?', ''));
      (0, _chai.expect)(query.get('direction')).to.equal('asc');
      (0, _chai.expect)(query.get('sortBy')).to.equal(property.path);
    });
    it('doesn\'t render a sort indicator', function () {
      const {
        container
      } = renderSubject(property, sortBy, direction);
      (0, _chai.expect)(container.querySelector('svg')).to.be.null;
    });
  });
});