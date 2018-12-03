const BaseProperty = require('../base/property')

const ID_PROPERTY = '_id'

// __v indicates versionKey in mongoose
const VERSION_KEY_PROPERTY = '__v'

class Property extends BaseProperty {
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
    super({ path: path.path })
    this.mongoosePath = path
  }

  name() {
    return this.mongoosePath.path
  }

  isEditable() {
    return this.name() !== VERSION_KEY_PROPERTY && this.name() !== ID_PROPERTY
  }

  isVisible() {
    // fields containing password are hidden by default
    return this.name() !== VERSION_KEY_PROPERTY && !this.name().match('password')
  }

  isId() {
    return this.name() === ID_PROPERTY
  }

  type() {
    switch (this.mongoosePath.instance) {
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
      console.warn(`Unhandled type: ${this.mongoosePath.instance}`)
      return 'string'
    }
  }
}

module.exports = Property
