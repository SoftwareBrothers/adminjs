"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ForbiddenError = void 0;
var _errorType = require("../../../utils/error-type.enum");
/**
 * Error which is thrown when user
 * doesn't have an access to a given resource/action.
 *
 * @category Errors
 */
class ForbiddenError extends Error {
  /**
   * HTTP Status code: 403
   */

  /**
   * Base error message and type which is stored in the record
   */

  /**
   * Any custom message which should be seen in the UI
   */

  /**
   * @param {string} [message]
   */
  constructor(message) {
    const defaultMessage = 'You cannot perform this action';
    super(defaultMessage);
    this.statusCode = 403;
    this.baseMessage = message;
    this.baseError = {
      message: message !== null && message !== void 0 ? message : defaultMessage,
      type: _errorType.ErrorTypeEnum.Forbidden
    };
    this.name = _errorType.ErrorTypeEnum.Forbidden;
  }
}
exports.ForbiddenError = ForbiddenError;
var _default = ForbiddenError;
exports.default = _default;