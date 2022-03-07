"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validationError = _interopRequireDefault(require("../../utils/errors/validation-error"));

var _forbiddenError = _interopRequireDefault(require("../../utils/errors/forbidden-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @private
 * @classdesc
 * Function which catches all the errors thrown by the action hooks or handler
 */
const actionErrorHandler = (error, context) => {
  if (error instanceof _validationError.default) {
    var _error$baseError;

    const {
      resource
    } = context;
    const {
      record,
      currentAdmin
    } = context;
    const baseMessage = ((_error$baseError = error.baseError) === null || _error$baseError === void 0 ? void 0 : _error$baseError.message) || context.translateMessage('thereWereValidationErrors', resource.id());
    return {
      record: _objectSpread(_objectSpread({}, record === null || record === void 0 ? void 0 : record.toJSON(currentAdmin)), {}, {
        params: {},
        populated: {},
        errors: error.propertyErrors
      }),
      notice: {
        message: baseMessage,
        type: 'error'
      }
    };
  }

  if (error instanceof _forbiddenError.default) {
    const {
      resource
    } = context;
    const baseMessage = error.baseMessage || context.translateMessage('anyForbiddenError', resource.id());
    return {
      notice: {
        message: baseMessage,
        type: 'error'
      }
    };
  }

  throw error;
};

var _default = actionErrorHandler;
exports.default = _default;