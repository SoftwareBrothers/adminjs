/* eslint class-methods-use-this: 0 object-curly-newline: 0 */

/**
 * @name PropertyType
 * @typedef {object} PropertyType
 * @memberof BaseProperty
 * @alias PropertyType
 * @property {string} string      default property type
 * @property {string} float       type of floating point numbers
 * @property {string} number      regular number
 * @property {string} boolean     boolean value
 * @property {string} date        date
 * @property {string} datetime    date with time
 * @property {string} mixed       type representing an object
 * @property {string} reference   many to one reference
 * @property {string} richtext    wysiwig editor
 * @property {string} textarea    resizable textarea input
 * @property {string} password    password field
 */

// Spacer
const TITLE_COLUMN_NAMES = ['title', 'name', 'subject', 'email']

export type PropertyType =
  'string' | 'float' | 'number' | 'boolean' |
  'date' | 'datetime' | 'mixed' | 'reference' |
  'richtext' | 'textarea' | 'password' | 'currency' | 'phone';

// description
type BasePropertyAttrs = {
  path: string;
  type?: PropertyType;
  isId?: boolean;
  isSortable?: boolean;
  position?: number;
}

/**
 * Represents Resource Property
 * @category Base
 */
class BaseProperty {
  private _path: string

  private _type: PropertyType

  private _isId: boolean

  private _isSortable: boolean

  private _position: number

  /**
   * @param  {object} options
   * @param  {string} options.path                     property path: usually it its key but when
   *                                                   property is for an object the path can be
   *                                                   divided to parts by dots: i.e.
   *                                                   'address.street'
   * @param  {PropertyType}  [options.type='string']
   * @param  {boolean} [options.isId=false]            true when field should be treated as an ID
   * @param  {boolean} [options.isSortable=true]       if property should be sortable
   */
  constructor({
    path,
    type = 'string',
    isId = false,
    isSortable = true,
    position = 1,
  }: BasePropertyAttrs) {
    this._path = path
    this._type = type
    this._isId = isId
    if (!this._path) {
      throw new Error('you have to give path parameter when creating BaseProperty')
    }
    this._isSortable = isSortable
    this._position = position
  }

  /**
   * Name of the property
   * @return {string} name of the property
   */
  name(): string {
    return this._path
  }

  path(): string {
    return this.name()
  }

  position(): number {
    return this._position === undefined ? 1 : this._position
  }

  /**
   * Return type of a property
   * @return {PropertyType}
   */
  type(): PropertyType {
    return this._type || 'string'
  }

  /**
   * Return true if given property should be treated as a Record Title.
   *
   * @return {boolean}
   */
  isTitle(): boolean {
    return TITLE_COLUMN_NAMES.includes(this._path.toLowerCase())
  }

  /**
   * Indicates if given property should be visible
   *
   * @return {Boolean}
   */
  isVisible(): boolean {
    return !this._path || !this._path.match('password')
  }

  /**
   * Indicates if value of given property can be updated
   *
   * @return {boolean}
   */
  isEditable(): boolean {
    return true
  }

  /**
   * Returns true if given property is a uniq key in a table/collection
   *
   * @return {boolean}
   */
  isId(): boolean {
    return !!this._isId
  }

  /**
   * If property is a reference to a record of different resource
   * it should contain {@link BaseResource.id} of this resource.
   *
   * When property is responsible for the field: 'user_id' in SQL database
   * reference should be the name of the Resource which it refers to: `Users`
   */
  reference(): string | null {
    return null
  }

  /**
   * Returns all available values which field can accept. It is used in case of
   * enums
   *
   * @return  {Array<String> | null}  array of all available values or null when field
   *                                  is not an enum.
   */
  availableValues(): Array<string> | null {
    return null
  }

  /**
   * Returns true when given property is an array
   *
   * @return  {boolean}
   */
  isArray(): boolean {
    return false
  }

  /**
   * Returns true when given property has draggable elements.
   * Only usable for array properties.
   *
   * @return  {boolean}
   */
  isDraggable(): boolean {
    return false
  }

  /**
   * In case of `mixed` type returns all nested properties.
   *
   * @return  {Array<BaseProperty>} sub properties
   */
  subProperties(): Array<BaseProperty> {
    return []
  }

  /**
   * Indicates if given property can be sorted
   *
   * @return {boolean}
   */
  isSortable(): boolean {
    return this._isSortable
  }

  /**
   * Indicates if given property is required
   */
  isRequired(): boolean {
    return false
  }
}

export default BaseProperty
