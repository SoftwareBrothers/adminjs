/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const moment = require('moment')
const xss = require('xss')
const _ = require('lodash')
const BaseProperty = require('../adapters/base-property')
const ViewHelpers = require('./view-helpers')

const DEFAULT_MAX_ITEMS_IN_LIST = 5

/**
 * Base decorator class which decorates the Resource
 * Each resource has BaseDecorator
 */
class BaseDecorator {
  /**
   * @param  {Object}       options   custom resource settings
   * @param  {BaseResource} resource  resource which is decorated
   * @param  {AdminBro}     admin     current instance of AdminBro
   */
  constructor({ resource, admin, options = {} }) {
    this._resource = resource
    this._admin = admin
    this._options = options

    this.helpers = new ViewHelpers({ admin })
  }

  /**
   * Returns the name for the resource.
   * @return {String} resource name
   */
  getResourceName() {
    return this._options.name || this._resource.name()
  }

  /**
   * Returns resource parent along with the icon. By default it is a
   * database type with its icon
   * @return {Object}
   */
  getParent() {
    const parent = this._options.parent || this._resource.databaseName()
    const name = parent.name || parent
    const icon = parent.icon ? parent.icon : `icon-${this._resource.databaseType() || 'database'}`
    return { name, icon }
  }

  /**
   * Returns list of all properties which will be visible on the list
   * @return {BaseProperty[]}
   */
  getListProperties() {
    const overridenProperties = this._options.listProperties
    if (overridenProperties) {
      return overridenProperties.map(property => this.nameToProperty(property))
    }
    return this._resource.properties()
      .filter(property => property.isVisible()).slice(0, DEFAULT_MAX_ITEMS_IN_LIST)
  }

  /**
   * Returns list of all properties which will be visible on the show view
   * @return {BaseProperty[]}
   */
  getShowProperties() {
    const overridenProperties = this._options.showProperties
    if (overridenProperties) {
      return overridenProperties.map(property => this.nameToProperty(property))
    }
    return this._resource.properties().filter(property => property.isEditable())
  }

  /**
   * Returns list of all properties which will be visible on the edit view
   * @return {BaseProperty[]}
   */
  getEditProperties() {
    const overridenProperties = this._options.editProperties
    if (overridenProperties) {
      return overridenProperties.map(property => this.nameToProperty(property))
    }
    return this._resource.properties().filter(property => property.isEditable())
  }

  /**
   * Returns object(map) with default actions as keys and their values
   */
  getDefaultActions(record) {
    const resource = this._resource
    return {
      show: {
        path: this.helpers.showRecordUrl(resource, record),
        icon: 'icomoon-info',
        label: 'Info',
        enable: true,
        isDefaultAction: true,
      },
      edit: {
        path: this.helpers.editRecordUrl(resource, record),
        icon: 'icomoon-edit',
        label: 'Edit',
        enable: true,
        isDefaultAction: true,
      },
      remove: {
        path: this.helpers.deleteRecordUrl(resource, record),
        icon: 'icomoon-remove-2',
        label: 'Remove',
        enable: true,
        isDefaultAction: true,
      },
    }
  }

  /**
   * Returns custom action object with all needed props
   */
  configuratedAction(record, action) {
    return {
      ...action,
      path: this.helpers.customRecordActionUrl(this._resource, record, action.id),
    }
  }

  /**
   * Returns all configurated actions
   */
  configuratedActions(actions, record) {
    return Object.keys(actions).reduce((obj, key) => {
      const action = actions[key]
      const isCustomAction = !action.isDefaultAction
      if (isCustomAction) {
        obj[action.id] = this.configuratedAction(record, action)
      } else {
        obj[key] = action
      }
      return obj
    }, {})
  }

  /**
   * Returns only visible actions of the given view
   */
  getVisibleActions(actions, view) {
    return Object.keys(actions).reduce((obj, key) => {
      const { enable } = actions[key]
      const isVisible = Array.isArray(enable) ? enable.includes(view) : enable
      if (isVisible) {
        obj[key] = actions[key]
      }
      return obj
    }, {})
  }

  /**
  * Returns object(map) with record actions declared in resource options.
  * If record doesn't have declared actions, it automatically returns default ones
  */
  getRecordActions(record, view) {
    const defaultActions = this.getDefaultActions(record)
    const recordActions = this._options.actions
    if (recordActions) {
      const mergedActions = _.merge(defaultActions, recordActions)
      const configuratedActions = this.configuratedActions(mergedActions, record)
      return view ? this.getVisibleActions(configuratedActions, view) : configuratedActions
    }
    return view ? this.getVisibleActions(defaultActions, view) : defaultActions
  }

  /**
   * Change name to the Property object
   * Custom Properties are not sortable
   * @param  {String} propertyName [description]
   * @return {BaseProperty}              [description]
   */
  nameToProperty(propertyName) {
    return this._resource.property(propertyName)
      || new BaseProperty({ path: propertyName, isSortable: false })
  }

  /**
   * Returns value for given field.
   *
   * @param  {Object} options
   * @param  {BaseRecord}   options.record
   * @param  {BaseProperty} options.property
   * @param  {String}       options.where    one of: list | show
   * @return {String}                        Html string which will be rendered
   */

  // eslint-disable-next-line no-unused-vars
  getValue({ record, property, where }) {
    if (property.type() === 'date') {
      return moment(record.param(property.name())).format('YYYY-MM-DD')
    }
    return xss(record.param(property.name()))
  }
}

module.exports = BaseDecorator
