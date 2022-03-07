"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineTranslations = void 0;

var _merge = _interopRequireDefault(require("lodash/merge"));

var _translateFunctions = require("../utils/translate-functions.factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Contains all the translations for given language. Everything is divided to
 * sections/blocks like actions, properties, buttons, labels and messages,
 * but also the same sections can can be nested under 'resources' property.
 *
 * This allows you to define translations either for entire UI or for a specific resource.
 * Take a look at this example:
 *
 * ```javascript
 * {
 *   translations: {
 *     buttons: {
 *       save: 'Save it',
 *     },
 *     resources: {
 *       Comments: {
 *         buttons: {
 *           save: 'Save this comment'
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * In the example above all save buttons will be named: 'Save it'. All but save button in
 * Comments resource. Where the button name will be: Save this comment.
 *
 * @memberof AdminJSOptions
 * @alias LocaleTranslations
 * @typedef {Object} LocaleTranslations
 * @property {Record<string, string>} [actions]         translated action labels
 * @property {Record<string, string>} [properties]      translated resource properties
 * @property {Record<string, string>} [messages]        translated messages
 * @property {Record<string, string>} [buttons]         translated button labels
 * @property {Record<string, string>} [labels]          translated labels
 * @property {Record<string, object>} [resources]       optional resources sub-translations
 * @property {Record<string, object>} resources.resourceId  Id of a resource from the database. i.e.
 *                                                      Comments for comments mongoose collection
 * @property {Record<string, string>} [resources.resourceId.actions]
 * @property {Record<string, string>} [resources.resourceId.properties]
 * @property {Record<string, string>} [resources.resourceId.messages]
 * @property {Record<string, string>} [resources.resourceId.buttons]
 * @property {Record<string, string>} [resources.resourceId.labels]
 *
 */
// Escaping all keys with . (changing to '&#46;')
const renameKeys = object => Object.entries(object).reduce((memo, [k, v]) => {
  if (typeof v === 'object') {
    return _objectSpread(_objectSpread({}, memo), {}, {
      [(0, _translateFunctions.formatName)(k)]: renameKeys(v)
    });
  }

  return _objectSpread(_objectSpread({}, memo), {}, {
    [(0, _translateFunctions.formatName)(k)]: v
  });
}, {});

const combineTranslations = (originalTranslations, adminTranslations = {}) => {
  const formattedTranslations = renameKeys(adminTranslations);
  return (0, _merge.default)(originalTranslations, formattedTranslations);
};

exports.combineTranslations = combineTranslations;