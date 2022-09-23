import { CurrentAdmin, RecordJSON, NoticeMessage } from '@adminjs/common/interfaces'

import BaseRecord from '../adapters/record/base-record'
import BaseResource from '../adapters/resource/base-resource'
import ActionDecorator from '../decorators/action/action-decorator'
import AdminJS from '../adminjs'

export type ActionType = 'resource' | 'record' | 'bulk'

/**
 * Execution context for an action. It is passed to the {@link Action#handler},
 * {@link Action#before} and {@link Action#after} functions.
 *
 *
 *
 * @memberof Action
 * @alias ActionContext
 */
export type ActionContext = {
  /**
   * current instance of AdminJS. You may use it to fetch other Resources by their names:
   */
  _admin: AdminJS;
  /**
   * Resource on which action has been invoked. Null for dashboard handler.
   */
  resource: BaseResource;
  /**
   * Record on which action has been invoked (only for {@link actionType} === 'record')
   */
  record?: BaseRecord;
  /**
   * Records on which action has been invoked (only for {@link actionType} === 'bulk')
   */
  records?: Array<BaseRecord>;
  /**
   * Object of currently invoked function. Not present for dashboard action
   */
  action: ActionDecorator;
  /**
   * Currently logged in admin
   */
  currentAdmin?: CurrentAdmin;
  /**
   * Any custom property which you can add to context
   */
  [key: string]: any;
}

/**
 * Context object passed to a PageHandler
 *
 * @alias PageContext
 * @memberof AdminJSOptions
 */
export type PageContext = {
  /**
   * current instance of AdminJS. You may use it to fetch other Resources by their names:
   */
  _admin: AdminJS;
    /**
   * Currently logged in admin
   */
  currentAdmin?: CurrentAdmin;
}

/**
 * ActionRequest
 * @memberof Action
 * @alias ActionRequest
 */
export type ActionRequest = {
  /**
   * parameters passed in an URL
   */
  params: {
    /**
     * Id of current resource
     */
    resourceId: string;
    /**
     * Id of current record (in case of record action)
     */
    recordId?: string;
    /**
     * Id of selected records (in case of bulk action) divided by commas
     */
    recordIds?: string;
    /**
     * Name of an action
     */
    action: string;
    /**
     * an optional search query string (for `search` resource action)
     */
    query?: string;

    [key: string]: any;
  };
  /**
   * POST data passed to the backend
   */
  payload?: Record<string, any>;
  /**
   * Elements of query string
   */
  query?: Record<string, any>;
  /**
   * HTTP method
   */
  method: 'post' | 'get';
}

/**
 * Base response for all actions
 * @memberof Action
 * @alias ActionResponse
 */
export type ActionResponse = {
  /**
   * Notice message which should be presented to the end user after showing the action
   */
  notice?: NoticeMessage;
  /**
   * redirect path
   */
  redirectUrl?: string;
  /**
   * Any other custom parameter
   */
  [key: string]: any;
}

/**
 * @description
 * Defines the type of {@link Action#isAccessible} and {@link Action#isVisible} functions
 * @alias IsFunction
 * @memberof Action
 */
export type IsFunction = (context: ActionContext) => boolean

/**
 * Required response of a Record action. Extends {@link ActionResponse}
 *
 * @memberof Action
 * @alias RecordActionResponse
 */
export type RecordActionResponse = ActionResponse & {
  /**
   * Record object.
   */
  record: RecordJSON;
}

/**
 * Required response of a Record action. Extends {@link ActionResponse}
 *
 * @memberof Action
 * @alias RecordActionResponse
 */
export type BulkActionResponse = ActionResponse & {
  /**
   * Array of RecordJSON objects.
   */
  records: Array<RecordJSON>;
}

/**
 * Type of a handler function. It has to return response compatible
 * with {@link ActionResponse}, {@link BulkActionResponse} or {@link RecordActionResponse}
 *
 * @alias ActionHandler
 * @async
 * @memberof Action
 * @returns {Promise<T>}
 */
export type ActionHandler<T> = (
  request: ActionRequest,
  response: any,
  context: ActionContext
) => Promise<T>

/**
 * Before action hook. When it is given - it is performed before the {@link ActionHandler}
 * method.
 * @alias Before
 * @returns {Promise<ActionRequest>}
 * @memberof Action
 * @async
 */
export type Before = (
  /**
   * Request object
   */
  request: ActionRequest,
    /**
   * Invocation context
   */
  context: ActionContext,
) => Promise<ActionRequest>

/**
 * Type of an after hook action.
 *
 * @memberof Action
 * @alias After
 * @async
 */
export type After<T> = (
  /**
   * Response returned by the default ActionHandler
   */
  response: T,
  /**
   * Original request which has been sent to ActionHandler
   */
  request: ActionRequest,
  /**
   * Invocation context
   */
  context: ActionContext,
) => Promise<T>

export type BuildInActions =
  'show' |
  'edit' |
  'list' |
  'delete' |
  'bulkDelete' |
  'new' |
  'search'

/**
 * @classdesc
 * Interface representing an Action in AdminJS.
 * Look at {@tutorial actions} to see where you can use this interface.
 *
 * #### Example Action
 *
 * ```
 * const action = {
 *   actionType: 'record',
 *   icon: 'View',
 *   isVisible: true,
 *   handler: async () => {...},
 *   component: AdminJS.bundle('./my-action-component'),
 * }
 * ```
 *
 * There are 3 kinds of actions:
 *
 * 1. Resource action, which is performed for an entire resource.
 * 2. Record action, invoked for an record in a resource
 * 3. Bulk action, invoked for an set of records in a resource
 *
 * ...and there are 7 actions predefined in AdminJS
 *
 * 1. {@link module:NewAction new} (resource action) - create new records in a resource
 * 2. {@link module:ListAction list} (resource action) - list all records within a resource
 * 3. {@link module:SearchAction search} (resource action) - search by query string
 * 4. {@link module:EditAction edit} (record action) - update records in a resource
 * 5. {@link module:ShowAction show} (record action) - show details of given record
 * 6. {@link module:DeleteAction delete} (record action) - delete given record
 * 7. {@link module:BulkDeleteAction bulkDelete} (bulk action) - delete given records
 *
 * Users can also create their own actions or override those already existing by using
 * {@link ResourceOptions}
 *
 * ```javascript
 * const AdminJSOptions = {
 *   resources: [{
 *     resource: User,
 *     options: {
 *       actions: {
 *         // example of overriding existing 'new' action for
 *         // User resource.
 *         new: {
 *           icon: 'Add'
 *         },
 *         // Example of creating a new 'myNewAction' which will be
 *         // a resource action available for User model
 *         myNewAction: {
 *           actionType: 'resource',
 *           handler: async (request, response, context) => {...}
 *         }
 *       }
 *     }
 *   }]
 * }
 *
 * const { ACTIONS } = require('adminjs')
 * // example of adding after filter for 'show' action for all resources
 * ACTIONS.show.after = async () => {...}
 * ```
 */
export interface Action <T extends ActionResponse> {
  /**
   * Name of an action which is its uniq key.
   * If you use one of _list_, _search_, _edit_, _new_, _show_, _delete_ or
   * _bulkDelete_ you override existing actions.
   * For all other keys you create a new action.
   */
  name: BuildInActions | string;
  /**
   * indicates if action should be visible for given invocation context.
   * It also can be a simple boolean value.
   * `True` by default.
   * The most common example of usage is to hide resources from the UI.
   * So let say we have 2 resources __User__ and __Cars__:
   *
   * ```javascript
   * const User = mongoose.model('User', mongoose.Schema({
   *   email: String,
   *   encryptedPassword: String,
   * }))
   * const Car = mongoose.model('Car', mongoose.Schema({
   *   name: String,
   *   ownerId: { type: mongoose.Types.ObjectId, ref: 'User' },
   * })
   * ```
   *
   * so if we want to hide Users collection, but allow people to pick user when
   * creating cars. We can do this like this:
   *
   * ```javascript
   * new AdminJS({ resources: [{
   *   resource: User,
   *   options: { actions: { list: { isVisible: false } } }
   * }]})
   * ```
   * In contrast - when we use {@link Action#isAccessible} instead - user wont be able to
   * pick car owner.
   *
   * @see {@link ActionContext}   parameter passed to isAccessible
   * @see {@link IsFunction}      exact type of the function
   */
  isVisible?: boolean | IsFunction;
  /**
   * Indicates if the action can be invoked for given invocation context.
   * You can pass a boolean or function of type {@link IsFunction}, which
   * takes {@link ActionContext} as an argument.
   *
   * You can use it as a carrier between the hooks.
   *
   * Example for isVisible function which allows the user to edit cars which belongs only
   * to her:
   *
   * ```javascript
   * const canEditCars = ({ currentAdmin, record }) => {
   *   return currentAdmin && (
   *     currentAdmin.role === 'admin'
   *     || currentAdmin._id === record.param('ownerId')
   *   )
   * }
   *
   * new AdminJS({ resources: [{
   *   resource: Car,
   *   options: { actions: { edit: { isAccessible: canEditCars } } }
   * }]})
   * ```
   *
   * @see {@link ActionContext}   parameter passed to isAccessible
   * @see {@link IsFunction}      exact type of the function
   */
  isAccessible?: boolean | IsFunction;
  /**
   * Type of an action - could be either _resource_, _record_ or _bulk_.
   *
   * <img src="./images/actions.png">
   *
   * When you define a new action - it is required.
   */
  actionType: ActionType;
  /**
   * handler function which will be invoked by either:
   * - {@link ApiController#resourceAction}
   * - {@link ApiController#recordAction}
   * - or {@link ApiController#bulkAction}
   * when user visits clicks action link.
   *
   * If you are defining this action for a record it has to return:
   * - {@link ActionResponse} for resource action
   * - {@link RecordActionResponse} for record action
   * - {@link BulkActionResponse} for bulk action
   *
   * ```javascript
   * // Handler of a 'record' action
   * handler: async (request, response, context) {
   *   const user = context.record
   *   const Cars = context._admin.findResource('Car')
   *   const userCar = Car.findOne(context.record.param('carId'))
   *   return {
   *     record: user.toJSON(context.currentAdmin),
   *   }
   * }
   * ```
   *
   * Required for new actions. For modifying already defined actions
   * like new and edit we suggest using {@link Action#before} and {@link Action#after} hooks.
   */
  handler: ActionHandler<T> | Array<ActionHandler<T>> | null;
  /**
   * Before action hook. When it is given - it is performed before the {@link Action#handler}
   * method.
   *
   * Example of hashing password before creating it:
   *
   * ```javascript
   * actions: {
   *   new: {
   *     before: async (request) => {
   *       if(request.payload.password) {
   *         request.payload = {
   *           ...request.payload,
   *           encryptedPassword: await bcrypt.hash(request.payload.password, 10),
   *           password: undefined,
   *         }
   *       }
   *       return request
   *     },
   *   }
   * }
   * ```
   */
  before?: Before | Array<Before>;
  /**
   * After action hook. When it is given - it is performed on the returned,
   * by {@link Action#handler handler} function response.
   *
   * You can use it to (just an idea)
   * - create log of changes done in the app
   * - prefetch additional data after original {@link Handler} is being performed
   *
   * Creating a changelog example:
   *
   * ```javascript
   * // example mongoose model
   * const ChangeLog = mongoose.model('ChangeLog', mongoose.Schema({
   *   // what action
   *   action: { type: String },
   *   // who
   *   userId: { type: mongoose.Types.ObjectId, ref: 'User' },
   *   // on which resource
   *   resource: { type: String },
   *   // was record involved (resource and recordId creates to polymorphic relation)
   *   recordId: { type: mongoose.Types.ObjectId },
   * }, { timestamps: true }))
   *
   * // actual after function
   * const createLog = async (originalResponse, request, context) => {
   *   // checking if object doesn't have any errors or is a delete action
   *   if ((request.method === 'post'
   *        && originalResponse.record
   *        && !Object.keys(originalResponse.record.errors).length)
   *        || context.action.name === 'delete') {
   *     await ChangeLog.create({
   *       action: context.action.name,
   *       // assuming in the session we store _id of the current admin
   *       userId: context.currentAdmin && context.currentAdmin._id,
   *       resource: context.resource.id(),
   *       recordId: context.record && context.record.id(),
   *     })
   *   }
   *   return originalResponse
   * }
   *
   * // and attaching this function to actions for all resources
   * const { ACTIONS } = require('adminjs')
   *
   * ACTIONS.edit.after = [createLog]
   * ACTIONS.delete.after = [createLog]
   * ACTIONS.new.after = [createLog]
   * ```
   *
   */
  after?: After<T> | Array<After<T>>;
}
