import { DeleteAction } from './delete/delete-action.js'
import { ShowAction } from './show/show-action.js'
import { NewAction } from './new/new-action.js'
import { EditAction } from './edit/edit-action.js'
import { SearchAction } from './search/search-action.js'
import { ListAction } from './list/list-action.js'
import { BulkDeleteAction } from './bulk-delete/bulk-delete-action.js'
import { BuildInActions } from './action.interface.js'

export * from './delete/delete-action.js'
export * from './show/show-action.js'
export * from './new/new-action.js'
export * from './edit/edit-action.js'
export * from './search/search-action.js'
export * from './list/list-action.js'
export * from './bulk-delete/bulk-delete-action.js'
export * from './action.interface.js'

export const ACTIONS: {[key in BuildInActions]: any} = {
  new: NewAction,
  list: ListAction,
  show: ShowAction,
  edit: EditAction,
  delete: DeleteAction,
  bulkDelete: BulkDeleteAction,
  search: SearchAction,
}
