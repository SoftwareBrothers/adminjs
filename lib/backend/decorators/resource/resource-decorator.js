"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DEFAULT_MAX_COLUMNS_IN_LIST = void 0;

var _viewHelpers = _interopRequireDefault(require("../../utils/view-helpers/view-helpers"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Default maximum number of items which should be present in a list.
 *
 * @type {Number}
 * @private
 */
const DEFAULT_MAX_COLUMNS_IN_LIST = 8;
/**
 * Base decorator class which decorates the Resource.
 *
 * @category Decorators
 */

exports.DEFAULT_MAX_COLUMNS_IN_LIST = DEFAULT_MAX_COLUMNS_IN_LIST;

class ResourceDecorator {
  /**
   * Map of all root level properties. By root properties we mean property which is not nested
   * under other mixed property.
   *
   * Examples from PropertyOptions:
   * {
   *   rootProperty: { type: mixed }, // root property
   *
   *    // nested property - this should go be the subProperty of rootProperty
   *   'rootProperty.nested': { type: 'string' }
   *
   *   // also root property because there is no another property of type mixed
   *   'another.property': { type: 'string' },
   * }
   *
   * for a the reference {@see decorateProperties}
   */

  /**
   * @param  {object}       options
   * @param  {BaseResource} options.resource  resource which is decorated
   * @param  {AdminJS}     options.admin  current instance of AdminJS
   * @param  {ResourceOptions} [options.options]
   */
  constructor({
    resource,
    admin,
    options = {}
  }) {
    this.getPropertyByKey = this.getPropertyByKey.bind(this);
    this._resource = resource;
    this._admin = admin;
    this.h = new _viewHelpers.default({
      options: admin.options
    });
    /**
     * Options passed along with a given resource
     * @type {ResourceOptions}
    */

    this.options = options;
    this.options.properties = this.options.properties || {};
    /**
     * List of all decorated root properties
     * @type {Array<PropertyDecorator>}
     */

    this.properties = (0, _utils.decorateProperties)(resource, admin, this);
    /**
     * Actions for a resource
     * @type {Object<String, ActionDecorator>}
     */

    this.actions = (0, _utils.decorateActions)(resource, admin, this);
  }
  /**
   * Returns the name for the resource.
   * @return {string} resource name
   */


  getResourceName() {
    return this._admin.translateLabel(this.id(), this.id());
  }
  /**
   * Returns the id for the resource.
   * @return {string} resource id
   */


  id() {
    return this.options.id || this._resource.id();
  }
  /**
   * Returns resource parent along with the icon. By default it is a
   * database type with its icon
   * @return {Parent}   ResourceJSON['parent']}
   */


  getNavigation() {
    return (0, _utils.getNavigation)(this.options, this._resource);
  }
  /**
   * Returns propertyDecorator by giving property path
   *
   * @param   {String}  propertyPath  property path
   *
   * @return  {PropertyDecorator}
   */


  getPropertyByKey(propertyPath) {
    return (0, _utils.getPropertyByKey)(propertyPath, this.properties);
  }
  /**
   * Returns list of all properties which will be visible in given place (where)
   *
   * @param   {Object}  options
   * @param   {String}  options.where   one of: 'list', 'show', 'edit', 'filter'
   * @param   {String}  [options.max]   maximum number of properties returned where there are
   *                                    no overrides in the options
   *
   * @return {Array<PropertyDecorator>}
   */


  getProperties({
    where,
    max = 0
  }) {
    const whereProperties = `${where}Properties`; // like listProperties, viewProperties etc

    if (where && this.options[whereProperties] && this.options[whereProperties].length) {
      return this.options[whereProperties].map(propertyName => {
        const property = this.getPropertyByKey(propertyName);

        if (!property) {
          // eslint-disable-next-line no-console
          console.error([`[AdminJS]: There is no property of the name: "${propertyName}".`, `Check out the "${where}Properties" in the`, `resource: "${this._resource.id()}"`].join(' '));
        }

        return property;
      }).filter(property => property);
    }

    const properties = Object.keys(this.properties).filter(key => !where || this.properties[key].isVisible(where)).sort((key1, key2) => this.properties[key1].position() > this.properties[key2].position() ? 1 : -1).map(key => this.properties[key]);

    if (max) {
      return properties.slice(0, max);
    }

    return properties;
  }
  /**
   * Returns all the properties with corresponding subProperties in one object.
   */


  getFlattenProperties() {
    return Object.keys(this.properties).reduce((memo, propertyName) => {
      const property = this.properties[propertyName];
      const subProperties = (0, _utils.flatSubProperties)(property);
      return Object.assign(memo, {
        [propertyName]: property
      }, subProperties);
    }, {});
  }

  getListProperties() {
    return this.getProperties({
      where: 'list',
      max: DEFAULT_MAX_COLUMNS_IN_LIST
    });
  }
  /**
   * List of all actions which should be invoked for entire resource and not
   * for a particular record
   *
   * @param {CurrentAdmin} currentAdmin   currently logged in admin user
   * @return  {Array<ActionDecorator>}     Actions assigned to resources
   */


  resourceActions(currentAdmin) {
    return Object.values(this.actions).filter(action => action.isResourceType() && action.isVisible(currentAdmin) && action.isAccessible(currentAdmin));
  }
  /**
   * List of all actions which should be invoked for entire resource and not
   * for a particular record
   *
   * @param {CurrentAdmin} currentAdmin   currently logged in admin user
   * @return  {Array<ActionDecorator>}     Actions assigned to resources
   */


  bulkActions(record, currentAdmin) {
    return Object.values(this.actions).filter(action => action.isBulkType() && action.isVisible(currentAdmin, record) && action.isAccessible(currentAdmin, record));
  }
  /**
   * List of all actions which should be invoked for given record and not
   * for an entire resource
   *
   * @param {CurrentAdmin} [currentAdmin]   currently logged in admin user
   * @return  {Array<ActionDecorator>}     Actions assigned to each record
   */


  recordActions(record, currentAdmin) {
    return Object.values(this.actions).filter(action => action.isRecordType() && action.isVisible(currentAdmin, record) && action.isAccessible(currentAdmin, record));
  }
  /**
   * Returns PropertyDecorator of a property which should be treated as a title property.
   *
   * @return  {PropertyDecorator} PropertyDecorator of title property
   */


  titleProperty() {
    const properties = Object.values(this.properties);
    const titleProperty = properties.find(p => p.isTitle());
    return titleProperty || properties[0];
  }
  /**
   * Returns title for given record.
   *
   * For example: If given record has `name` property and this property has `isTitle` flag set in
   * options or by the Adapter - value for this property will be shown
   *
   * @param   {BaseRecord}  record
   *
   * @return  {String}      title of given record
   */


  titleOf(record) {
    return record.get(this.titleProperty().name());
  }

  getHref(currentAdmin) {
    const {
      href
    } = this.options;

    if (href) {
      if (typeof href === 'function') {
        return href({
          resource: this._resource,
          currentAdmin,
          h: this.h
        });
      }

      return href;
    }

    if (this.resourceActions(currentAdmin).find(action => action.name === 'list')) {
      return this.h.resourceUrl({
        resourceId: this.id()
      });
    }

    return null;
  }
  /**
   * Returns JSON representation of a resource
   *
   * @param {CurrentAdmin} currentAdmin
   * @return  {ResourceJSON}
   */


  toJSON(currentAdmin) {
    const flattenProperties = this.getFlattenProperties();
    const flattenPropertiesJSON = Object.keys(flattenProperties).reduce((memo, key) => _objectSpread(_objectSpread({}, memo), {}, {
      [key]: flattenProperties[key].toJSON()
    }), {});
    return {
      id: this.id(),
      name: this.getResourceName(),
      navigation: this.getNavigation(),
      href: this.getHref(currentAdmin),
      titleProperty: this.titleProperty().toJSON(),
      resourceActions: this.resourceActions(currentAdmin).map(ra => ra.toJSON(currentAdmin)),
      actions: Object.values(this.actions).map(action => action.toJSON(currentAdmin)),
      properties: flattenPropertiesJSON,
      listProperties: this.getProperties({
        where: 'list',
        max: DEFAULT_MAX_COLUMNS_IN_LIST
      }).map(property => property.toJSON('list')),
      editProperties: this.getProperties({
        where: 'edit'
      }).map(property => property.toJSON('edit')),
      showProperties: this.getProperties({
        where: 'show'
      }).map(property => property.toJSON('show')),
      filterProperties: this.getProperties({
        where: 'filter'
      }).map(property => property.toJSON('filter'))
    };
  }

}

var _default = ResourceDecorator;
exports.default = _default;