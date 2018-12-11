/* eslint class-methods-use-this: 0 */

const TITLE_COLUMN_NAMES = ['title', 'name', 'subject', 'email']

/**
 * Represents Resource Property
 *
 * @mermaid
 *   graph TD
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
  constructor({ path, type, isId, isSortable = true}) {
    this._path = path
    this._type = type
    this._isId = isId
    this._isSortable = isSortable
  }

  /**
   * Name of the property
   * @return {String} name of the property
   */
  name() {
    return this._path
  }

  /**
   * Return type of a property
   * @return {String} One of available property types:
   *                      [id, string, float, number, boolean, date]
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
   * Indicates if given property can be sorted
   * @return {Boolean}
   */
  isSortable() {
    return this._isSortable
  }
}

module.exports = BaseProperty
