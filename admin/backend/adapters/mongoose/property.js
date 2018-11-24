const AbstractProperty = require('../abstract/property')

class Property extends AbstractProperty {
  /**
   * Crates an object from mongoose schema path
   *
   * @param  {SchemaString}   path
   * @param  {String[]}       path.enumValues
   * @param  {String}         path.regExp
   * @param  {String}         path.path
   * @param  {String}         path.instance
   * @param  {Object[]}       path.validators
   * @param  {Object[]}       path.setters
   * @param  {Object[]}       path.getters
   * @param  {Object}         path.options
   * @param  {Object}         path._index
   *
   * @example
   *
   * const schema = new mongoose.Schema({
   *   email: String,
   * })
   *
   * property = new Property(schema.paths.email))
   */
  constructor(path) {
    super()
    this.path = path
  }

  name() {
    return this.path.path
  }

  isEditable() {
    return this.isVisible() && this.name() !== '_id'
  }

  isVisible() {
    // __v indicates versionKey in mongoose
    return this.name() !== '__v'
  }

  isId() {
    return this.name() === '_id'
  }

  type() {
    switch (this.path.instance) {
    case 'String':
      return 'string'
    case 'Boolean':
      return 'boolean'
    case 'Number':
      return 'number'
    case 'Date':
      return 'date'
    case 'ObjectID':
      return 'string'
    case 'Decimal128':
      return 'float'
    default:
      throw new Error(`Unhandled type: ${this.path.instance}`)
    }
  }
}

module.exports = Property
