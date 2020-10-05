import { DeleteAction } from './delete/delete-action'
import { ShowAction } from './show/show-action'
import { NewAction } from './new/new-action'
import { EditAction } from './edit/edit-action'
import { SearchAction } from './search/search-action'
import { ListAction } from './list/list-action'
import { BulkDeleteAction } from './bulk-delete/bulk-delete-action'
import { BuildInActions } from './action.interface'

export * from './delete/delete-action'
export * from './show/show-action'
export * from './new/new-action'
export * from './edit/edit-action'
export * from './search/search-action'
export * from './list/list-action'
export * from './bulk-delete/bulk-delete-action'
export * from './action.interface'

export const ACTIONS: {[key in BuildInActions]: any} = {
  new: NewAction,
  list: ListAction,
  show: ShowAction,
  edit: EditAction,
  delete: DeleteAction,
  bulkDelete: BulkDeleteAction,
  search: SearchAction,
}
