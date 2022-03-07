"use strict";

var _chai = require("chai");

var _requestParser = _interopRequireDefault(require("./request-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const buildResourceWithProperty = (key, property) => {
  const resource = {
    _decorated: {
      getPropertyByKey: path => key === path ? property : null
    }
  };
  return resource;
};

let resource;
describe('RequestParser', function () {
  const baseRequest = {
    params: {
      resourceId: 'resourceId',
      action: 'edit'
    },
    method: 'post',
    payload: {}
  };
  describe('boolean values', function () {
    beforeEach(function () {
      resource = buildResourceWithProperty('isHired', {
        type: () => 'boolean'
      });
    });
    it('sets value to `false` when empty string is given', function () {
      var _requestParser$payloa;

      const request = _objectSpread(_objectSpread({}, baseRequest), {}, {
        payload: {
          isHired: ''
        }
      });

      (0, _chai.expect)((_requestParser$payloa = (0, _requestParser.default)(request, resource).payload) === null || _requestParser$payloa === void 0 ? void 0 : _requestParser$payloa.isHired).to.be.false;
    });
    it('changes "true" string to true', function () {
      var _requestParser$payloa2;

      const request = _objectSpread(_objectSpread({}, baseRequest), {}, {
        payload: {
          isHired: 'true'
        }
      });

      (0, _chai.expect)((_requestParser$payloa2 = (0, _requestParser.default)(request, resource).payload) === null || _requestParser$payloa2 === void 0 ? void 0 : _requestParser$payloa2.isHired).to.be.true;
    });
    it('changes "false" string to true', function () {
      var _requestParser$payloa3;

      const request = _objectSpread(_objectSpread({}, baseRequest), {}, {
        payload: {
          isHired: 'false'
        }
      });

      (0, _chai.expect)((_requestParser$payloa3 = (0, _requestParser.default)(request, resource).payload) === null || _requestParser$payloa3 === void 0 ? void 0 : _requestParser$payloa3.isHired).to.be.false;
    });
  });
});