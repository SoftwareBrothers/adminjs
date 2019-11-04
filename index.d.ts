import AdminBro from './types/src/admin-bro'

import * as ACTIONS from './types/src/backend/actions/index'
import { ReduxState } from './types/src/frontend/store/store'

export { default as Router } from './types/src/backend/router'
export { default as Filter } from './types/src/backend/utils/filter'
export { default as ValidationError } from './types/src/backend/utils/validation-error'
export { default as ApiClient } from './types/src/frontend/utils/api-client'

export { CurrentAdmin } from './types/src/current-admin.interface'
export { PropertyType } from './types/src/backend/adapters/base-property'
export { ResourceOptions } from './types/src/backend/decorators/resource-options.interface'
export { default as AdminBroOptions } from './types/src/admin-bro-options.interface'
export { default as PropertyOptions } from './types/src/backend/decorators/property-options.interface'
export { default as Action } from './types/src/backend/actions/action.interface'

export { default as BaseProperty } from './types/src/backend/adapters/base-property'
export { default as BaseResource } from './types/src/backend/adapters/base-resource'
export { default as BaseDatabase } from './types/src/backend/adapters/base-database'
export { default as BaseRecord } from './types/src/backend/adapters/base-record'

export { default as RecordJSON } from './types/src/backend/decorators/record-json.interface'
export { default as ResourceJSON } from './types/src/backend/decorators/resource-json.interface'
export { default as ActionJSON } from './types/src/backend/decorators/resource-json.interface'
export { default as PropertyJSON } from './types/src/backend/decorators/property-json.interface'

export { BasePropertyProps, FilterPropertyProps, PropertyProps } from './types/src/frontend/components/property-type/base-property-props'
export { ActionProps } from './types/src/frontend/components/actions/action.props'


export * from './types/src/frontend/components/ui'
export * from './types/src/frontend/components/app'

export {
  AdminBro as default,
  // Actions
  ACTIONS,
}

declare const REDUX_STATE: ReduxState
