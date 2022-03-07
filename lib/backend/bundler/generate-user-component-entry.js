"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var path = _interopRequireWildcard(require("path"));

var _slash = _interopRequireDefault(require("slash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Generates entry file for all UsersComponents.
 * Entry consists of 3 parts:
 * 1. setup AdminJS.UserComponents map.
 * 2. List of all environmental variables passed to AdminJS in configuration option.
 * 3. Import of UserComponents defined by AdminJS.bundle(src)
 *
 * @param {AdminJS}    admin
 * @param {String}      entryPath  path to folder where entry file is located
 * @return {String}     content of an entry file
 *
 * @private
 */
const generateUserComponentEntry = (admin, entryPath) => {
  const {
    env = {}
  } = admin.options;
  const {
    UserComponents
  } = global;
  const absoluteEntryPath = path.resolve(entryPath);
  const setupPart = 'AdminJS.UserComponents = {}\n';
  const envPart = Object.keys(env).map(envKey => `AdminJS.env.${envKey} = ${JSON.stringify(env[envKey])}\n`).join('');
  const componentsPart = Object.keys(UserComponents || {}).map(componentId => {
    const componentUrl = path.relative(absoluteEntryPath, UserComponents[componentId]);
    return [`import ${componentId} from '${(0, _slash.default)(componentUrl)}'`, `AdminJS.UserComponents.${componentId} = ${componentId}`].join('\n');
  }).join('\n');
  return setupPart + envPart + componentsPart;
};

var _default = generateUserComponentEntry;
exports.default = _default;