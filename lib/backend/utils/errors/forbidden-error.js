"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ForbiddenError = void 0;

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
   * Any custom message which should be seen in the UI
   */

  /**
   * @param {string} [message]
   */
  constructor(message) {
    super('You cannot perform this action');
    this.statusCode = 403;
    this.baseMessage = message;
    this.name = 'ForbiddenError';
  }

}

exports.ForbiddenError = ForbiddenError;
var _default = ForbiddenError;
exports.default = _default;