"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ConfigurationError = void 0;

var CONSTANTS = _interopRequireWildcard(require("../../../constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const buildUrl = page => `${CONSTANTS.DOCS}/${page}`;
/**
 * Error which is thrown when user messed up something in the configuration
 *
 * @category Errors
 */


class ConfigurationError extends Error {
  /**
   * @param   {string}  fnName  name of the function, base on which error will
   * print on the output link to the method documentation.
   * @param {string} message
   */
  constructor(message, fnName) {
    const msg = `
    ${message}
    More information can be found at: ${buildUrl(fnName)}
    `;
    super(msg);
    this.message = msg;
    this.name = 'ConfigurationError';
  }

}

exports.ConfigurationError = ConfigurationError;
var _default = ConfigurationError;
exports.default = _default;