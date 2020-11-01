import { New } from './new'
import { Edit } from './edit'
import { Show } from './show'
import { List } from './list'
import { BulkDelete } from './bulk-delete'

export * from './new'
export * from './action.props'
export * from './edit'
export * from './show'
export * from './list'
export * from './bulk-delete'
export * from './utils'

export const actions = {
  new: New,
  edit: Edit,
  show: Show,
  list: List,
  bulkDelete: BulkDelete,
}
