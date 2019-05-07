/* eslint class-methods-use-this: 0 no-unused-vars: 0 */

const NotImplementedError = require('../utils/not-implemented-error')

/**
 * Representation of an ORM database in AdminBro
 * @category Base
 *
 * @mermaid
 *   graph LR
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(BaseRecord)
 *   B --> |has many|D(BasePorperty)
 */
class BaseDatabase {
  /**
   * Checks if given adapter supports database provided by user
   *
   * @param  {any}  database    database provided in AdminBroOptions#databases array
   * @return {Boolean}          if given adapter supports this database - returns true
   */
  static isAdapterFor(database) {
    throw new NotImplementedError('BaseDatabase.isAdapterFor')
  }

  /**
   * returns array of all resources (collections/tables) in the database
   *
   * @return {BaseResource[]}
   */
  resources() {
    throw new NotImplementedError('BaseDatabase#resources')
  }
}

module.exports = BaseDatabase
