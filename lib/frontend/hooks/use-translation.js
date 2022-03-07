"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTranslation = exports.default = void 0;

var _reactI18next = require("react-i18next");

var _translateFunctions = require("../../utils/translate-functions.factory");

const _excluded = ["i18n"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * @classdesc
 * Extends the useTranslation hook from react-i18next library.
 *
 * Returns all the {@link TranslateFunctions} + methods returned by the original
 * useTranslation method from react-i18next like: `i18n` instance and `ready` flag.
 *
 * @class
 * @subcategory Hooks
 * @bundle
 * @hideconstructor
 * @returns {UseTranslationResponse}
 */
const useTranslation = () => {
  // eslint-disable-next-line no-shadow
  const _originalUseTranslati = (0, _reactI18next.useTranslation)(),
        {
    i18n
  } = _originalUseTranslati,
        rest = _objectWithoutProperties(_originalUseTranslati, _excluded);

  const translateFunctions = (0, _translateFunctions.createFunctions)(i18n);
  return _objectSpread(_objectSpread({}, rest), {}, {
    i18n
  }, translateFunctions);
};

exports.useTranslation = useTranslation;
var _default = useTranslation;
exports.default = _default;