"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _notImplementedError = _interopRequireDefault(require("../../utils/errors/not-implemented-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-useless-constructor */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint class-methods-use-this: 0 no-unused-vars: 0 */

/**
 * Representation of an ORM database in AdminJS
 * @category Base
 *
 * @mermaid
 *   graph LR
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(BaseRecord)
 *   B --> |has many|D(BaseProperty)
 */
class BaseDatabase {
  constructor(database) {}
  /**
   * Checks if given adapter supports database provided by user
   *
   * @param  {any}  database    database provided in AdminJSOptions#databases array
   * @return {Boolean}          if given adapter supports this database - returns true
   */


  static isAdapterFor(database) {
    throw new _notImplementedError.default('BaseDatabase.isAdapterFor');
  }
  /**
   * returns array of all resources (collections/tables) in the database
   *
   * @return {BaseResource[]}
   */


  resources() {
    throw new _notImplementedError.default('BaseDatabase#resources');
  }

}

var _default = BaseDatabase;
exports.default = _default;