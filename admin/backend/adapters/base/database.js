const NotImplementedError = require('../../utils/not-implemented-error')

/**
 * Representation of an ORM/database in AdminBro
 *
 * @mermaid
 *   graph TD
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(BaseRecord)
 *   B --> |has many|D(BasePorperty)
 */
class BaseDatabase {
  /**
   * returns array of all resources (collections/tables) in the database
   * @return {BaseResource[]}
   */
  resources() {
    throw new NotImplementedError()
  }
}

module.exports = BaseDatabase
