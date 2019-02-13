const deleteAction = require('./delete-action')
const showAction = require('./show-action')
const editAction = require('./edit-action')
const newAction = require('./new-action')

/**
 * @typedef {Object} Action
 * @property {Array<String>} actionType             it could be either: [`record`], [`resource]`
 *                                                  or both.
 * @property {ActionHandler} handler                function which is executed when the action
 * @property {IsVisible} isVisible                  if action should be available for a particular
 *                                                  Record/Resource pair.
 *                                                  is invoked
 * @property {String} name                          uniq name of the acton - will be used
 *                                                  in an URL
 * @property {String} [label]                       name of the actio which will appear in the
 *                                                  UI
 * @property {String} [icon]                        icon class of an action
 * @property {Object} [guard]                       optional guard message
 * @property {Object} guard.title
 * @property {Object} guard.content
 * @property {Object} guard.button
 */

/**
 * @typedef {Function} ActionHandler
 * @property {Object}       request                 Request object passed by the backend framework
 * @property {Object}       request.params          params passed via the URL like _resourceId_,
 *                                                  _recordId_, or _action_ name
 * @property {Object}       request.payload         post data send in request
 * @property {Object}       request.query           query parameters
 * @property {Object}       response
 * @property {Function}     response.redirect       redirect function from the framework
 * @property {Object}       data                    data passed as the context of the action
 * @property {AdminBro}     data._admin             current AdminBro instance
 * @property {BaseResource} data.resource           recource on which action was performed
 * @property {BaseRecord}   [data.record]           record - only in case of action with 'record`
 *                                                  set as an actionType
 * @property {ViewHelpers}  data.h                  view helpers
 * @property {Action}       data.action             action object
 * @returns {Promise<String>}        html of a page which should be rendered
 * @async
 */


/**
 * @typedef {Function} IsVisible
 * @property {BaseResource} resource
 * @property {BaseRecord} record
 * @returns {Boolean}
 */

module.exports = {
  show: showAction,
  edit: editAction,
  delete: deleteAction,
  new: newAction,
}
