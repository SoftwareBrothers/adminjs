const NotImplementedError = require('../../utils/not-implemented-error')

/**
 * Representation of an ORM/database in AdminBro
 *
 * @mermaid
 *   graph TD
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(AbstractInstance)
 *   B --> |has many|D(AbstractPorperty)
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
