/**
 * @interface BaseAction
 *
 * @description
 * Inteface representing an Action in AdminBro.
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
 *   component: AdminBro.require('./my-action-component'),
 * }
 * ```
 *
 * There are 2 kinds of actions:
 *
 * 1. Resource action, which is performed for an entire resource.
 * 2. Record action, invoked for an record in a resource
 *
 * ...and there are 4 actions predefined in AdminBro
 *
 * 1. {@link module:NewAction new} (resource action) - create new records in a resource
 * 2. {@link module:EditAction edit} (record action) - update records in a resource
 * 3. {@link module:ShowAction show} (record action) - show details of given record
 * 3. {@link module:DeleteAction delete} (record action) - delete given record
 *
 * Users can also create their own actions or override those already exising by using
 * {@link ResourceOptions}
 *
 * @category Base
 */

/**
 * @name name
 * @description action uniq name
 * @type {String}
 * @memberof BaseAction
 */

/**
 * @name isVisible
 * @description
 * indicates if action should be visible for given resource and record.
 * It also can be a simple boolean value.
 * @method
 * @memberof BaseAction
 * @param {BaseResource} resource
 * @param {BaseRecord}   record
 * @example
 * {
 *   ...,
 *   isVisible: (resource, record) => record.param('email') !== '',
 *   ...
 * }
 */

/**
 * @name label
 * @description name of the actio which will appear in the UI
 * @type {String}
 * @memberof BaseAction
 */

/**
 * @name icon
 * @description icon class of an action
 * @type {String}
 * @memberof BaseAction
 */

/**
 * @name guard
 * @description guard message - user will have to confirm it before executing an action
 * @type {String}
 * @memberof BaseAction
 */

/**
 * @name component
 * @description
 * Component which will be used to render the action.
 * Action components accepts following prop types:
 * 1. resource: {@link BaseResource~JSON}
 * 2. action: {@link Action~JSON}
 * 3. recordId: String
 * @type {Component}
 * @memberof BaseAction
 */

/**
 * @name handler
 * @description
 * handler function which will be invoked by {@link ApiController#resourceAction}
 * or {@link ApiController#recordAction}
 * @method
 * @memberof BaseAction
 *
 * @param {Object}       request             Request object passed by the backend framework
 * @param {Object}       request.params      passed via the URL like _resourceId_,
 *                                    _recordId_, or _action_ name
 * @param {Object}       request.payload     post data send in request
 * @param {Object}       request.query       query string parameters
 * @param {String}       request.method      either 'post' or 'get'
 * @param {Object}       response            Response object passed by the backend framework
 * @param {Object}       data                data passed as the context of the action
 * @param {AdminBro}     data._admin         current AdminBro instance
 * @param {BaseResource} data.resource       recource on which action was performed
 * @param {BaseRecord}   [data.record]       record - only in case of action with 'record`
 * @param {ViewHelpers}  data.h              view helpers
 * @param {Action}       data.action         object representing particular action
 */
