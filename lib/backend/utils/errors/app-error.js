"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AppError = void 0;
var _errorType = require("../../../utils/error-type.enum");
/**
 * Error which can be thrown by developer in custom actions/hooks/components
 *
 * @category Errors
 */
class AppError extends Error {
  /**
   * HTTP Status code, defaults to 400
   */

  /**
   * Base error message and type which is stored in the record
   */

  /**
   * Any custom message which should be seen in the UI
   */

  /**
   * Any additional error information
   */

  /**
   * @param {string} message    a message to be shared with the client
   * @param {string} data       additional data to be shared with the client
   */
  constructor(message, data) {
    super(message);
    this.statusCode = 400;
    this.baseMessage = message;
    this.baseError = {
      message,
      type: _errorType.ErrorTypeEnum.App
    };
    this.data = data;
    this.name = _errorType.ErrorTypeEnum.App;
  }
}
exports.AppError = AppError;
var _default = AppError;
exports.default = _default;