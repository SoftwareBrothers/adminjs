const deleteAction = require('./delete-action')
const showAction = require('./show-action')
const editAction = require('./edit-action')
const newAction = require('./new-action')
const listAction = require('./list-action')

module.exports = {
  show: showAction,
  edit: editAction,
  delete: deleteAction,
  new: newAction,
  list: listAction,
}
