"use strict";

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _adapters = require("../../../adapters");

var _overrideFromOptions = require("./override-from-options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('overrideFromOptions', () => {
  const propertyName = 'type';
  const rawValue = 'boolean';
  const optionsValue = 'string';
  let property;
  beforeEach(() => {
    property = _sinon.default.createStubInstance(_adapters.BaseProperty, {
      [propertyName]: _sinon.default.stub().returns(rawValue)
    });
  });
  it('returns value from BaseProperty function when options are not given', () => {
    (0, _chai.expect)((0, _overrideFromOptions.overrideFromOptions)(propertyName, property, {})).to.eq(rawValue);
  });
  it('returns value from options it is given', () => {
    (0, _chai.expect)((0, _overrideFromOptions.overrideFromOptions)(propertyName, property, {
      [propertyName]: optionsValue
    })).to.eq(optionsValue);
  });
});