"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useTranslation = require("../../../hooks/use-translation");

var _utils = require("../../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const List = props => {
  const {
    property,
    record
  } = props;
  const values = _utils.flat.get(record.params, property.path) || [];
  const {
    translateProperty
  } = (0, _useTranslation.useTranslation)();
  return /*#__PURE__*/_react.default.createElement("span", null, `${translateProperty('length')}: ${values.length}`);
};

var _default = List;
exports.default = _default;