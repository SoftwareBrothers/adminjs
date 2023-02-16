import { New } from './new.js'
import { Edit } from './edit.js'
import { Show } from './show.js'
import { List } from './list.js'
import { BulkDelete } from './bulk-delete.js'

export * from './new.js'
export * from './action.props.js'
export * from './edit.js'
export * from './show.js'
export * from './list.js'
export * from './bulk-delete.js'
export * from './utils/index.js'

export const actions = {
  new: New,
  edit: Edit,
  show: Show,
  list: List,
  bulkDelete: BulkDelete,
}
