"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PropertyDecorator: true,
  PropertyOptions: true
};
Object.defineProperty(exports, "PropertyDecorator", {
  enumerable: true,
  get: function () {
    return _propertyDecorator.default;
  }
});
Object.defineProperty(exports, "PropertyOptions", {
  enumerable: true,
  get: function () {
    return _propertyOptions.default;
  }
});

var _propertyDecorator = _interopRequireDefault(require("./property-decorator"));

var _propertyOptions = _interopRequireWildcard(require("./property-options.interface"));

Object.keys(_propertyOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _propertyOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _propertyOptions[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }