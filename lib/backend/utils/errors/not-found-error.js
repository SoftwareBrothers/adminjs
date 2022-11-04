"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NotFoundError = void 0;
var _errorType = require("../../../utils/error-type.enum");
var CONSTANTS = _interopRequireWildcard(require("../../../constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const buildUrl = page => `${CONSTANTS.DOCS}/${page}`;

/**
 * Error which is thrown when given record/resource/action hasn't been found.
 *
 * @category Errors
 */
class NotFoundError extends Error {
  /**
   * HTTP Status code: 404
   */

  /**
   * Base error message and type which is stored in the record
   */

  /**
   * Any custom message which should be seen in the UI
   */

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
    this.statusCode = 404;
    this.baseMessage = message;
    this.baseError = {
      message,
      type: _errorType.ErrorTypeEnum.NotFound
    };
    this.message = msg;
    this.name = _errorType.ErrorTypeEnum.NotFound;
  }
}
exports.NotFoundError = NotFoundError;
var _default = NotFoundError;
exports.default = _default;