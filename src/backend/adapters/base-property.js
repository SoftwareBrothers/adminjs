/* eslint class-methods-use-this: 0 object-curly-newline: 0 */

const TITLE_COLUMN_NAMES = ['title', 'name', 'subject', 'email']

/**
 * Represents Resource Property
 * @category Base
 *
 * @mermaid
 *   graph LR
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(BaseRecord)
 *   B --> |has many|D(BasePorperty)
 */
class BaseProperty {
  /**
   * @param  {Object} options
   * @param  {String} options.path property path: usually it its key but when
   *                               property is for an object the path can be
   *                               divided to parts by dots: i.e. 'address.street'
   * @param  {String} options.type on if: id, string, float, number, boolean, date
   * @param  {String} options.isId true when field should be treated as an ID
   * @param  {String} options.isSortable by default: true
   */
  constructor({ path, type, isId, isSortable = true }) {
    this._path = path
    this._type = type
    this._isId = isId
    if (!this._path) {
      throw new Error('you have to give path parameter when creating BaseProperty')
    }
    this._isSortable = isSortable
  }

  /**
   * Name of the property
   * @return {String} name of the property
   */
  name() {
    return this._path
  }

  path() {
    return this.name()
  }

  /**
   * Return type of a property
   * @return {String} One of available property types:
   *                      [id, string, float, number, boolean,
   *                       date, mixed]
   */
  type() {
    return this._type || 'string'
  }

  /**
   * Return true if given property should be treated as a Record Title.
   * @return {Boolean}
   */
  isTitle() {
    return TITLE_COLUMN_NAMES.includes(this._path.toLowerCase())
  }

  /**
   * Indicates if given property should be visible
   * @return {Boolean}
   */
  isVisible() {
    return !this._path || !this._path.match('password')
  }

  /**
   * Indicates if value of given property can be updated
   * @return {Boolean}
   */
  isEditable() {
    return true
  }

  /**
   * Returns true if given property is a uniq key in a table/collection
   * @return {Boolean}
   */
  isId() {
    return this._isId
  }

  /**
   * If property is a reference to a record of different resource
   * it should contain id of this resource.
   *
   * When property is responsible for the field: 'user_id' in SQL database
   * reference should be the name of the Resource which it refers to: `Users`
   */
  reference() {
    return null
  }

  /**
   * Returns all available values which field can accept. It is used in case of
   * enums
   *
   * @return  {Array<String> | null}  array of all available values or null when field
   *                                  is not an enum.
   */
  availableValues() {
    return null
  }

  /**
   * Returns true when given property is an array
   *
   * @return  {Boolean}
   */
  isArray() {
    return false
  }

  /**
   * In case of `mixed` type returns all nested properties.
   *
   * @return  {Array<BaseProperty>} sub properties
   */
  subProperties() {
    return []
  }

  /**
   * Indicates if given property can be sorted
   * @return {Boolean}
   */
  isSortable() {
    return this._isSortable
  }
}

module.exports = BaseProperty
