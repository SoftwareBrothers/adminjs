"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BasePropertyComponent: true
};
exports.default = exports.BasePropertyComponent = void 0;

var _basePropertyComponent = _interopRequireDefault(require("./base-property-component"));

var defaultType = _interopRequireWildcard(require("./default-type"));

var boolean = _interopRequireWildcard(require("./boolean"));

var datetime = _interopRequireWildcard(require("./datetime"));

var richtext = _interopRequireWildcard(require("./richtext"));

var reference = _interopRequireWildcard(require("./reference"));

var textarea = _interopRequireWildcard(require("./textarea"));

var password = _interopRequireWildcard(require("./password"));

var _basePropertyProps = require("./base-property-props");

Object.keys(_basePropertyProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _basePropertyProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _basePropertyProps[key];
    }
  });
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function camelizePropertyType(type) {
  return {
    Edit: type.edit,
    Show: type.show,
    List: type.list,
    Filter: type.filter
  };
}

const BasePropertyComponentExtended = Object.assign(_basePropertyComponent.default, {
  DefaultType: camelizePropertyType(defaultType),
  Boolean: camelizePropertyType(boolean),
  DateTime: camelizePropertyType(datetime),
  RichText: camelizePropertyType(richtext),
  Reference: camelizePropertyType(reference),
  TextArea: camelizePropertyType(textarea),
  Password: camelizePropertyType(password)
});
exports.BasePropertyComponent = exports.default = BasePropertyComponentExtended;