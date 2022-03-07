"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

require("./action-json.factory");

require("./page-json.factory");

require("./property-json.factory");

require("./record-json.factory");

require("./resource-json.factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-extraneous-dependencies
var _default = _factoryGirl.default;
exports.default = _default;