const NotImplementedError = require('../../utils/not-implemented-error')

/**
 * Representation of an ORM/database in AdminBro
 *
 * @mermaid
 *   graph TD
 *   A[AbstractDatabase] -->|has many| B(AbstractModel)
 *   B --> |has many|C(AbstractInstance)
 *   B --> |has many|D(AbstractPorperty)
 */
class AbstractDatabase {
  /**
   * Return name of the database
   * @return {String}
   */
  name() {
    throw new NotImplementedError()
  }

  /**
   * returns array of all models (collections/tables) in the database
   * @return {AbstractModel[]}
   */
  models() {
    throw new NotImplementedError()
  }

  /**
   * returns model for given name
   * @return {AbstractModel}
   */
  find(modelName) {
    throw new NotImplementedError()
  }
}

module.exports = AbstractDatabase
