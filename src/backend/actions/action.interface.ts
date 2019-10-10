import AdminBro from '../../admin-bro'
import { CurrentAdmin } from '../../current-admin.interface'
import ViewHelpers from '../utils/view-helpers'
import BaseRecord from '../adapters/base-record'
import BaseResource from '../adapters/base-resource'
import ActionDecorator from '../decorators/action-decorator'
import RecordJSON from '../decorators/record-json.interface'

/**
 * Execution context for an action. It is passed to the {@link Handler},
 * {@link Before} and {@link After} functions.
 *
 * ```
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
 * @memberof Action
 * @alias ActionContext
 */
export type ActionContext = {
  /**
   * current instance of AdminBro. You may use it to fetch other Resources by their names:
   */
  _admin: AdminBro;
  /**
   * Resource on which action has been invoked. Null for dashboard handler.
   */
  resource?: BaseResource;
  /**
   * Record on which action has been invoked (only for {@link actionType} === 'record')
   */
  record?: BaseRecord;
  /**
   * view helpers
   */
  h: ViewHelpers;
  /**
   * Object of currently invoked function. Not present for dashboard action
   */
  action?: ActionDecorator;
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
     * Id of current record
     */
    recordId?: string;
    /**
     * Name of an action
     */
    action: string;

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
 * @description
 * Defines the type of {@link isAccessible} and {@link isVisible} functions
 * @alias IsFunction
 * @memberof Action
 */
export type IsFunction = (context: ActionContext) => boolean

/**
 * Required response of a Record action
 * @memberof Action
 * @alias RecordActionResponse
 */
export type RecordActionResponse = {
  /**
   * Record object.
   */
  record: RecordJSON;
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
 * @alias ActionHandler
 * @async
 * @memberof Action
 */
export type ActionHandler = (
  request: ActionRequest,
  response: any,
  context: ActionContext
) => Promise<RecordActionResponse | any>

/**
 * Before action hook. When it is given - it is performed before the {@link ActionHandler}
 * method.
 * @alias Before
 * @memberof Action
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
) => ActionRequest

/**
 * Type of an after hook action.
 *
 * You can use it to (just an idea)
 * - create log of changes done in the app
 * - prefetch additional data after original {@link Handler} is being performed
 *
 * __Creating a changelog__
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
 *   // was record involved (resource and recordId creates to polimorfic relation)
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
 * const { ACTIONS } = require('admin-bro')
 *
 * ACTIONS.edit.after = createLog
 * ACTIONS.delete.after = createLog
 * ACTIONS.new.after = createLog
 * ```
 *
 * @memberof Action
 * @alias After
 */
export type After = (
  /**
   * Reponse returned by the default ActionHandler
   */
  response: any,
  /**
   * Original request which has been sent to ActionHandler
   */
  request: ActionRequest,
  /**
   * Invocation context
   */
  context: ActionContext,
) => any

/**
 * @classdesc
 * Inteface representing an Action in AdminBro.
 * Look at {@tutorial 05-actions} to see where you can use this interface.
 *
 * #### Example Action
 *
 * ```
 * const action = {
 *   actionType: ['record'],
 *   label: 'Publish',
 *   icon: 'fas fa-eye',
 *   isVisible: true,
 *   handler: async () => {...},
 *   component: AdminBro.bundle('./my-action-component'),
 * }
 * ```
 *
 * There are 2 kinds of actions:
 *
 * 1. Resource action, which is performed for an entire resource.
 * 2. Record action, invoked for an record in a resource
 *
 * ...and there are 5 actions predefined in AdminBro
 *
 * 1. {@link module:NewAction new} (resource action) - create new records in a resource
 * 1. {@link module:ListAction list} (resource action) - list all records within a resource
 * 2. {@link module:EditAction edit} (record action) - update records in a resource
 * 3. {@link module:ShowAction show} (record action) - show details of given record
 * 3. {@link module:DeleteAction delete} (record action) - delete given record
 *
 * Users can also create their own actions or override those already exising by using
 * {@link ResourceOptions}
 *
 * ```javascript
 * const AdminBroOptions = {
 *   resources: [{
 *     resource: User,
 *     options: {
 *       actions: {
 *         // example of overriding existing 'new' action for
 *         // User resource.
 *         new: {
 *           label: 'Create new record'
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
 * const { ACTIONS } = require('admin-bro')
 * // example of adding after filter for 'show' aciton for all resources
 * ACTIONS.show.after = async () => {...}
 * ```
 */
export default interface Action {
  /**
   * Name of an action which is its uniq key.
   * If use one of _list_, _edit_, _new_, _show_ or _delete_ you override existing actions.
   * For all other keys you create new action.
   */
  name: string;
  /**
   * indicates if action should be visible for given invocation context.
   * It also can be a simple boolean value.
   * `True` by default.
   */
  isVisible?: boolean | IsFunction;
  /**
   * indicates if action can be invoked for given invocation context.
   * You can pass a boolean or function of type {@link IsFunction}, which
   * takes {@link ActionContext} as an argument.
   */
  isAccessible?: boolean | IsFunction;
  /**
   * name of the action which will appear in the UI
   */
  label?: string;
  /**
   * if filter should be visible on the sidebar. Only for _resource_ actions
   */
  showFilter?: boolean;
  /**
   * Type of an action - could be either _resource_ or _record_
   * or both (passed as an array):
   *
   * <img src="./images/actions.png">
   */
  actionType?: 'resource' | 'record' | Array<'resource' | 'record'>;
  /**
   * icon class of an action
   */
  icon?: string;
  /**
   * guard message - user will have to confirm it before executing an action
   */
  guard?: string;
  /**
   * Component which will be used to render the action.
   * Action components accepts following prop types:
   *
   * 1. resource: {@link ResourceJSON}
   * 2. action: {@link ActionJSON}
   * 3. _(optional)_ recordId: string _(for recordAction)_
   *
   * When component is set to `false` then action doesn't have it's own view.
   * Instead after clicking button it is immediatelly performed. Example of
   * an action without a view is {@link module:DeleteAction}.
   */
  component?: string | false;
  /**
   * handler function which will be invoked by {@link ApiController#resourceAction}
   * or {@link ApiController#recordAction} when user visits clicks action link.
   *
   * If you are defining this action for a record it hast to return {@link RecordActionResponse}.
   */
  handler?: ActionHandler;
  /**
   * Before action hook. When it is given - it is performed before the {@link Action.handler}
   * method.
   */
  before?: Before;
  /**
   * After action hook. When it is given - it is performed on the returned,
   * by handler the {@link Action.handler}, object.
   */
  after?: After;
}
