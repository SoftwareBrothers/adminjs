"use strict";

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _reactTestingLibrary = require("react-testing-library");

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _sinon = _interopRequireDefault(require("sinon"));

require("sinon-chai");

var _edit = _interopRequireDefault(require("./edit"));

var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));

require("../../spec/property-json.factory");

require("../../spec/record-json.factory");

var _edit2 = _interopRequireDefault(require("../default-type/edit"));

var TranslateFunctionsFactory = _interopRequireWildcard(require("../../../../utils/translate-functions.factory"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AddNewItemText = 'Add new item';
describe('<PropertyType.Array.Edit />', function () {
  const propertyPath = 'arrayField';
  let property;
  let record; // eslint-disable-next-line mocha/no-setup-in-describe

  const onChange = _sinon.default.spy();

  const renderTestSubject = (prop, rec) => (0, _reactTestingLibrary.render)( /*#__PURE__*/_react.default.createElement(_testContextProvider.default, null, /*#__PURE__*/_react.default.createElement(_edit.default, {
    where: "edit",
    property: prop,
    record: rec,
    ItemComponent: _edit2.default,
    onChange: onChange,
    testId: "some-test-id",
    filter: {},
    resource: {}
  })));

  beforeEach(function () {
    _sinon.default.stub(TranslateFunctionsFactory, 'createFunctions').returns({
      translateProperty: _sinon.default.stub().returns(AddNewItemText),
      translateButton: _sinon.default.stub().returns('someButton')
    });
  });
  afterEach(function () {
    _sinon.default.restore();

    (0, _reactTestingLibrary.cleanup)();
  });
  context('Property with a string array', function () {
    beforeEach(async function () {
      property = await _factoryGirl.default.build('PropertyJSON', {
        path: propertyPath,
        isArray: true
      });
    });
    context('no items inside', function () {
      beforeEach(async function () {
        record = await _factoryGirl.default.build('RecordJSON', {
          params: {}
        });
      });
      it('renders label and addItem button', async function () {
        const {
          findByText
        } = renderTestSubject(property, record);
        const label = findByText(property.label);
        const addItemBtn = findByText(AddNewItemText);
        await (0, _reactTestingLibrary.wait)(() => {
          (0, _chai.expect)(label).not.to.be.null;
          (0, _chai.expect)(addItemBtn).not.to.be.null;
        });
      });
      it('renders new empty input field after clicking "add"', function () {
        const {
          getByText
        } = renderTestSubject(property, record);

        _reactTestingLibrary.fireEvent.click(getByText(AddNewItemText));

        (0, _chai.expect)(onChange).to.has.been.calledWith(property.path, ['']);
      });
    });
    context('2 items inside', function () {
      const values = ['element1', 'element2'];
      it('2 <input> tags already filed with values', async function () {
        record = await _factoryGirl.default.build('RecordJSON', {
          params: {
            [`${property.path}.0`]: values[0],
            [`${property.path}.1`]: values[1]
          }
        });
        const {
          findByDisplayValue
        } = renderTestSubject(property, record);
        await (0, _reactTestingLibrary.wait)(() => {
          (0, _chai.expect)(findByDisplayValue(values[0])).not.to.be.null;
          (0, _chai.expect)(findByDisplayValue(values[1])).not.to.be.null;
        });
      });
    });
  });
});