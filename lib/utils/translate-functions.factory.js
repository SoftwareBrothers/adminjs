"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatName = exports.createFunctions = void 0;

var _startCase = _interopRequireDefault(require("lodash/startCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatName = name => name.split('.').join('&#46;');

exports.formatName = formatName;

const translate = (i18n, key, name, resourceId, options) => {
  var _realOptions$defaultV;

  const realOptions = (typeof resourceId === 'string' ? options : resourceId) || {};
  const formattedName = formatName(name);
  let keys = [`${key}.${formattedName}`];

  if (resourceId) {
    keys = [`resources.${resourceId}.${key}.${formattedName}`, ...keys];
  }

  if (i18n.exists(keys)) {
    return i18n.t(keys, realOptions);
  }

  return (_realOptions$defaultV = realOptions.defaultValue) !== null && _realOptions$defaultV !== void 0 ? _realOptions$defaultV : (0, _startCase.default)(name);
};

const createFunctions = i18n => {
  const translateAction = (actionName, resourceId, options) => translate(i18n, 'actions', actionName, resourceId, options);

  const translateButton = (buttonLabel, resourceId, options) => translate(i18n, 'buttons', buttonLabel, resourceId, options);

  const translateLabel = (label, resourceId, options) => translate(i18n, 'labels', label, resourceId, options);

  const translateProperty = (propertyName, resourceId, options) => translate(i18n, 'properties', propertyName, resourceId, options);

  const translateMessage = (messageName, resourceId, options) => translate(i18n, 'messages', messageName, resourceId, options);

  return {
    translateAction,
    ta: translateAction,
    translateButton,
    tb: translateButton,
    translateLabel,
    tl: translateLabel,
    translateProperty,
    tp: translateProperty,
    translateMessage,
    tm: translateMessage,
    t: i18n.t,
    translate: i18n.t
  };
};

exports.createFunctions = createFunctions;