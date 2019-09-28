import ConfigurationError from '../utils/configuration-error'
import ViewHelpers from '../utils/view-helpers'
import { BaseResource, BaseRecord, AdminBro } from '../../admin-bro'
import Action, { Is } from '../actions/action.interface'
import CurrentAdmin from '../../current-admin.interface'

/**
 * @typedef {Object} BaseAction~JSON
 * @description JSON representation of an {@link Action}
 * @property {String} name
 * @property {String | Array<String>} actionType one of 'record' 'resource or
 *                                               an array containing both
 * @property {String} icon
 * @property {String} label
 * @property {String} guard
 * @property {String} component
 */

/**
 * Decorates an action
 *
 * @category Decorators
 */
export default class ActionDecorator {
  private name: string
  private _admin: AdminBro
  private _resource: BaseResource
  private h: ViewHelpers
  private action: Action
  /**
   * @param {Object}        params
   * @param {BaseAction}    params.action
   * @param {BaseResource}  params.resource
   * @param {AdminBro}      params.admin  current instance of AdminBro
   */
  constructor({ action, admin, resource }) {
    if (!action.actionType) {
      throw new ConfigurationError(
        `action: "${action.name}" does not have an "actionType" property`,
        'BaseAction',
      )
    }
    this.name = action.name
    this._admin = admin
    this._resource = resource
    this.h = new ViewHelpers({ options: admin.options })

    /**
     * Original action object
     * @type {BaseAction}
     */
    this.action = action
  }

  /**
   * Original handler wrapped with the hook `before` and `after` methods.
   */
  async handler(request, response, data) {
    let modifiedRequest = request
    if (this.action.before) {
      modifiedRequest = await this.action.before(request)
    }
    let ret = await this.action.handler(modifiedRequest, response, data)
    if (this.action.after) {
      ret = await this.action.after(ret)
    }
    return ret
  }

  /**
   * Returns true when action can be performed on a record
   *
   * @return  {Boolean}
   */
  isRecordType() {
    return this.action.actionType.includes('record')
  }

  /**
   * Returns true when action can be performed on an entire resource
   *
   * @return  {Boolean}
   */
  isResourceType() {
    return this.action.actionType.includes('resource')
  }

  is(what: 'isAccessible' | 'isVisible', currentAdmin?: CurrentAdmin, record?: BaseRecord) {
    if (!['isAccessible', 'isVisible'].includes(what)) {
      throw new Error(`'what' has to be either "isAccessible" or "isVisible". You gave ${what}`)
    }
    let isAction
    if (typeof this.action[what] === 'function') {
      isAction = (<Is> this.action[what])({
        resource: this._resource,
        action: this.action,
        h: this.h,
        currentAdmin,
        _admin: this._admin,
      })
    } else if (typeof this.action[what] === 'undefined') {
      isAction = true
    } else {
      isAction = this.action[what]
    }
    return isAction
  }

  /**
   * Is action visible in the UI
   * @param {BaseRecord} record           record for which action should be invoked
   * @param {CurrentAdmin} currentAdmin   currently logged in admin user
   *
   * @return  {Boolean}
   */
  isVisible(currentAdmin?: CurrentAdmin, record?: BaseRecord) {
    return this.is('isVisible', currentAdmin, record)
  }

  /**
   * Is action accessible
   *
   * @param {BaseRecord} record           record for which action should be invoked
   * @param {CurrentAdmin} currentAdmin   currently logged in admin user
   * @return  {Boolean}
   */
  isAccessible(currentAdmin?: CurrentAdmin, record?: BaseRecord) {
    return this.is('isAccessible', currentAdmin, record)
  }

  /**
   * Serializes action to JSON format
   *
   * @return  {Action~JSON}  serialized action
   */
  toJSON() {
    return {
      name: this.action.name,
      actionType: this.action.actionType,
      icon: this.action.icon,
      label: this.action.label,
      guard: this.action.guard,
      showFilter: this.action.showFilter,
      component: this.action.component,
    }
  }
}
