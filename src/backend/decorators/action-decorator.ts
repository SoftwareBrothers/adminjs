import ConfigurationError from '../utils/configuration-error'
import ViewHelpers from '../utils/view-helpers'
import AdminBro from '../../admin-bro'
import BaseResource from '../adapters/base-resource'
import Action, { IsFunction, ActionContext, ActionRequest } from '../actions/action.interface'
import { CurrentAdmin } from '../../current-admin.interface'
import ActionJSON from './action-json.interface'
import BaseRecord from '../adapters/base-record'

/**
 * Decorates an action
 *
 * @category Decorators
 */
class ActionDecorator {
  public name: string

  private _admin: AdminBro

  private _resource: BaseResource

  private h: ViewHelpers

  private action: Action

  /**
   * @param {Object}        params
   * @param {Action}    params.action
   * @param {BaseResource}  params.resource
   * @param {AdminBro}      params.admin  current instance of AdminBro
   */
  constructor({ action, admin, resource }) {
    if (!action.actionType) {
      throw new ConfigurationError(
        `action: "${action.name}" does not have an "actionType" property`,
        'Action',
      )
    }
    this.name = action.name
    this._admin = admin
    this._resource = resource
    this.h = new ViewHelpers({ options: admin.options })

    /**
     * Original action object
     * @type {Action}
     */
    this.action = action
  }

  /**
   * Original handler wrapped with the hook `before` and `after` methods.
   *
   * @param {ActionRequest} request
   * @param {any} response
   * @param {ActionContext} data
   *
   * @return {Promise<any>}
   */
  async handler(
    request: ActionRequest,
    response: any,
    data: ActionContext,
  ): Promise<any> {
    let modifiedRequest = request
    if (typeof this.action.before === 'function') {
      modifiedRequest = await this.action.before(request, data)
    }
    let ret = await this.action.handler(modifiedRequest, response, data)
    if (typeof this.action.after === 'function') {
      ret = await this.action.after(ret, modifiedRequest, data)
    }
    return ret
  }

  /**
   * Returns true when action can be performed on a record
   *
   * @return  {Boolean}
   */
  isRecordType(): boolean {
    return this.action.actionType.includes('record')
  }

  /**
   * Returns true when action can be performed on an entire resource
   *
   * @return  {Boolean}
   */
  isResourceType(): boolean {
    return this.action.actionType.includes('resource')
  }

  is(what: 'isAccessible' | 'isVisible', currentAdmin?: CurrentAdmin, record?: BaseRecord): boolean {
    if (!['isAccessible', 'isVisible'].includes(what)) {
      throw new Error(`'what' has to be either "isAccessible" or "isVisible". You gave ${what}`)
    }
    let isAction
    if (typeof this.action[what] === 'function') {
      isAction = (this.action[what] as IsFunction)({
        resource: this._resource,
        record,
        action: this,
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
   * @param {CurrentAdmin} [currentAdmin]   currently logged in admin user
   * @param {BaseRecord} [record]
   *
   * @return  {Boolean}
   */
  isVisible(currentAdmin?: CurrentAdmin, record?: BaseRecord): boolean {
    return this.is('isVisible', currentAdmin, record)
  }

  /**
   * Is action accessible
   *
   * @param {CurrentAdmin} [currentAdmin]   currently logged in admin user
   * @param {BaseRecord} [record]
   * @return  {Boolean}
   */
  isAccessible(currentAdmin?: CurrentAdmin, record?: BaseRecord): boolean {
    return this.is('isAccessible', currentAdmin, record)
  }

  /**
   * Serializes action to JSON format
   *
   * @return  {ActionJSON}  serialized action
   */
  toJSON(): ActionJSON {
    return {
      name: this.action.name,
      actionType: this.action.actionType,
      icon: this.action.icon,
      label: this.action.label || this.action.name,
      guard: this.action.guard,
      showFilter: !!this.action.showFilter,
      component: this.action.component,
    }
  }
}

export default ActionDecorator
