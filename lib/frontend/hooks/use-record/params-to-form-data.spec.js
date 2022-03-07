"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _chai = require("chai");

var _paramsToFormData = _interopRequireWildcard(require("./params-to-form-data"));

require("../../components/spec/record-json.factory");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('recordToFormData', function () {
  const propertyKey = 'someProperty';
  it('converts objects to const', async function () {
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: {}
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(_paramsToFormData.FORM_VALUE_EMPTY_OBJECT);
  });
  it('converts nulls to const', async function () {
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: null
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(_paramsToFormData.FORM_VALUE_NULL);
  });
  it('converts empty array to const', async function () {
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: []
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(_paramsToFormData.FORM_VALUE_EMPTY_ARRAY);
  });
  it('does not convert date to empty object', async () => {
    const date = new Date();
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: date
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(date.toISOString());
  });
});