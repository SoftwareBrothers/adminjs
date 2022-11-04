"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "React", {
  enumerable: true,
  get: function () {
    return _react.default;
  }
});
Object.defineProperty(exports, "ReactDOM", {
  enumerable: true,
  get: function () {
    return _reactDom.default;
  }
});
Object.defineProperty(exports, "ReactRedux", {
  enumerable: true,
  get: function () {
    return _reactRedux.default;
  }
});
var Lodash = _interopRequireWildcard(require("lodash"));
var _react = _interopRequireDefault(require("react"));
var _redux = _interopRequireDefault(require("redux"));
var _axios = _interopRequireDefault(require("axios"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _client = require("react-dom/client");
var _reactRedux = _interopRequireDefault(require("react-redux"));
var _reactRouter = _interopRequireDefault(require("react-router"));
var _reactRouterDom = _interopRequireDefault(require("react-router-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var styled = _interopRequireWildcard(require("styled-components"));
var _flat = _interopRequireDefault(require("flat"));
var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));
var _async = _interopRequireDefault(require("react-select/async"));
var _creatable = _interopRequireDefault(require("react-select/creatable"));
var ReactSelect = _interopRequireWildcard(require("react-select"));
var _i18next = _interopRequireDefault(require("i18next"));
var _reactI18next = _interopRequireDefault(require("react-i18next"));
var uuid = _interopRequireWildcard(require("uuid"));
var punycode = _interopRequireWildcard(require("punycode/"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable import/first, import/no-extraneous-dependencies */
window.global = {};
window.Lodash = Lodash;
window.React = _react.default;
window.ReactDOM = _reactDom.default;
window.createRoot = _client.createRoot;
window.Redux = _redux.default;
window.ReactRedux = _reactRedux.default;
window.flat = _flat.default;
window.ReactRouter = _reactRouter.default;
window.ReactRouterDOM = _reactRouterDom.default;
window.ReactDatepicker = _reactDatepicker.default;
window.styled = styled;
window.PropTypes = _propTypes.default;
window.axios = _axios.default;
window.ReactSelect = ReactSelect;
window.ReactSelectAsync = _async.default;
window.ReactSelectCreatable = _creatable.default;
window.i18n = _i18next.default;
window.ReactI18Next = _reactI18next.default;
window.punycode = punycode;
window.uuid = uuid;