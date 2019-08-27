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
 * @category Base
 */

/**
 * @typedef {Object} BaseAction~Context
 * @property {AdminBro}     _admin         current AdminBro instance
 * @property {BaseResource} resource       recource on which action was performed
 * @property {ViewHelpers}  h              view helpers
 * @property {ActionDecorator} action      object representing particular action
 * @property {Object}       currentAdmin   logged in admin
 */

/**
 * @typedef {Object} BaseAction~Request
 * @property {Object}       request             Request object passed by the backend framework
 * @property {Object}       request.params      passed via the URL like _resourceId_,
 *                                    _recordId_, or _action_ name
 * @property {Object}       request.payload     post data send in request
 * @property {Object}       request.query       query string parameters
 * @property {String}       request.method      either 'post' or 'get'
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
 * indicates if action should be visible for given invocation context.
 * It also can be a simple boolean value.
 * `True` by default.
 * @method
 * @memberof BaseAction
 * @param {BaseAction~Context}       data      data passed as the context of the action
 * @example
 * {
 *   ...,
 *   isVisible: (data) => data.currentAdmin.role === 'manager',
 *   ...
 * }
 */

/**
 * @name isAccessible
 * @description
 * indicates if action can be invoked for given invocation context.
 * Similar to {@link BaseAction.isVisible} - it also can be a simple boolean value.
 * @method
 * @memberof BaseAction
 * @param {BaseAction~Context}       data      data passed as the context of the action
 * @example
 * {
  *   ...,
  *   isAccessible: (data) => data.currentAdmin.role !== 'manager',
  *   ...
  * }
  */

/**
 * @name label
 * @description name of the action which will appear in the UI
 * @type {String}
 * @memberof BaseAction
 */

/**
 * @name showFilter
 * @description if filter should be visible on the sidebar. Only for _resource_ actions
 * @type {Boolean}
 * @memberof BaseAction
 */

/**
 * @name actionType
 * @description
 * Type of an action - could be either _resource_ or _record_
 * or both (passed as an array)
 * @type {String | Array}
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
 *
 * 1. resource: {@link BaseResource~JSON}
 * 2. action: {@link Action~JSON}
 * 3. _(optional)_ recordId: String _(for recordAction)_
 *
 * When component is set to `false` then action doesn't have it's own view.
 * Instead after clicking button it is immediatelly performed. Example of
 * an action without a view is {@link module:DeleteAction}.
 *
 * @type {Component | Boolean}
 * @memberof BaseAction
 */

/**
 * @name handler
 * @description
 * handler function which will be invoked by {@link ApiController#resourceAction}
 * or {@link ApiController#recordAction}
 * @async
 * @method
 * @memberof BaseAction
 *
 * @param {BaseAction~Request}  request        Request object passed by the backend framework
 * @param {Object}              response       Response object passed by the backend framework
 * @param {BaseAction~Context}  data           data passed as the context of the action
 * @param {Object}              data.record    optionally record - for ['record'] action type
 * @return {Object}             custom object returned by the action
 */

/**
 * @name before
 * @description
 * Before action hook. When it is given - it is performed before the {@link BaseAction.handler}
 * method.
 * @method
 * @async
 * @memberof BaseAction
 * @param {BaseAction~Request}  request        Request object passed by the backend framework
 * @return {BaseAction~Request}                modified request
 */

/**
 * @name after
 * @async
 * @description
 * After action hook. When it is given - it is performed on the returned,
 * by handler the {@link BaseAction.handler}, object,
 *
 * @method
 * @memberof BaseAction
 * @param {Object}  data        data returned by the {@link BaseAction.handler} function
 * @return {Object}                modified data
 */
