import { VariantType } from '@adminjs/design-system';
import AdminJS from '../../../adminjs';
import BaseResource from '../../adapters/resource/base-resource';
import { Action, ActionContext, ActionRequest, ActionResponse } from '../../actions/action.interface';
import { CurrentAdmin } from '../../../current-admin.interface';
import { ActionJSON } from '../../../frontend/interfaces/action/action-json.interface';
import BaseRecord from '../../adapters/record/base-record';
import { ParsedLayoutElement } from '../../utils/layout-element-parser';
/**
 * Decorates an action
 *
 * @category Decorators
 */
declare class ActionDecorator {
    name: string;
    private _admin;
    private _resource;
    private h;
    private action;
    /**
     * @param {Object}        params
     * @param {Action}        params.action
     * @param {BaseResource}  params.resource
     * @param {AdminJS}      params.admin  current instance of AdminJS
     */
    constructor({ action, admin, resource }: {
        action: Action<ActionResponse>;
        admin: AdminJS;
        resource: BaseResource;
    });
    /**
     * Original handler wrapped with the hook `before` and `after` methods.
     *
     * @param {ActionRequest} request
     * @param {any} response
     * @param {ActionContext} context
     *
     * @return {Promise<any>}
     */
    handler(request: ActionRequest, response: any, context: ActionContext): Promise<any>;
    /**
     * Invokes before action hooks if there are any
     *
     * @param {ActionRequest} request
     * @param {ActionContext} context
     *
     * @return {Promise<ActionRequest>}
     */
    invokeBeforeHook(request: ActionRequest, context: ActionContext): Promise<ActionRequest>;
    /**
     * Invokes action handler if there is any
     *
     * @param {ActionRequest} request
     * @param {any} response
     * @param {ActionContext} context
     *
     * @return {Promise<ActionResponse>}
     */
    invokeHandler(request: ActionRequest, response: any, context: ActionContext): Promise<ActionResponse>;
    /**
     * Invokes after action hooks if there are any
     *
     * @param {ActionResponse} response
     * @param {ActionRequest} request
     * @param {ActionContext} context
     *
     * @return {Promise<ActionResponse>}
     */
    invokeAfterHook(response: ActionResponse, request: ActionRequest, context: ActionContext): Promise<ActionResponse>;
    /**
     * Returns true when action can be performed on a record
     *
     * @return  {Boolean}
     */
    isRecordType(): boolean;
    /**
     * Returns true when action can be performed on an entire resource
     *
     * @return  {Boolean}
     */
    isResourceType(): boolean;
    /**
     * Returns true when action can be performed on selected records
     *
     * @return  {Boolean}
     */
    isBulkType(): boolean;
    is(what: 'isAccessible' | 'isVisible', currentAdmin?: CurrentAdmin, record?: BaseRecord): boolean;
    /**
     * Is action visible in the UI
     * @param {CurrentAdmin} [currentAdmin]   currently logged in admin user
     * @param {BaseRecord} [record]
     *
     * @return  {Boolean}
     */
    isVisible(currentAdmin?: CurrentAdmin, record?: BaseRecord): boolean;
    /**
     * Is action accessible
     *
     * @param {CurrentAdmin} [currentAdmin]   currently logged in admin user
     * @param {BaseRecord} [record]
     * @return  {Boolean}
     */
    isAccessible(currentAdmin?: CurrentAdmin, record?: BaseRecord): boolean;
    /**
     * Indicates if user can invoke given action
     *
     * @param   {ActionContext}  context  passed action context
     *
     * @return  {boolean}                 true given user has rights to the action
     * @throws  {ForbiddenError}          when user cannot perform given action
     */
    canInvokeAction(context: ActionContext): boolean;
    containerWidth(): ActionJSON['containerWidth'];
    layout(currentAdmin?: CurrentAdmin): Array<ParsedLayoutElement> | null;
    variant(): VariantType;
    parent(): string | null;
    custom(): Record<string, any>;
    hasHandler(): boolean;
    showResourceActions(): boolean;
    /**
     * Serializes action to JSON format
     *
     * @param {CurrentAdmin} [currentAdmin]
     *
     * @return  {ActionJSON}  serialized action
     */
    toJSON(currentAdmin?: CurrentAdmin): ActionJSON;
}
export default ActionDecorator;
