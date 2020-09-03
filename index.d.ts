import AdminBro from './types/src/admin-bro'

import * as ACTIONS from './types/src/backend/actions/index'
import { ReduxState } from './types/src/frontend/store/store'

export { flatten, unflatten } from './types/src/admin-bro'

export * from '@admin-bro/design-system'
export * from './types/src/frontend/store/store'
export * from './types/src/backend/utils/build-feature'
export * from './types/src/backend/utils/layout-element-parser'
export * from './types/src/backend/utils/uploaded-file.type'
export * from './types/src/frontend/utils/overridable-component'

export { default as Router } from './types/src/backend/router'
export { default as Filter } from './types/src/backend/utils/filter'
export { default as ValidationError, PropertyErrors } from './types/src/backend/utils/validation-error'
export { default as ForbiddenError } from './types/src/backend/utils/forbidden-error'
export {
  default as ApiClient,
  RecordActionAPIParams,
  ResourceActionAPIParams,
  GetPageAPIParams,
} from './types/src/frontend/utils/api-client'

export {
  default as ViewHelpers,
  ResourceActionParams,
  RecordActionParams,
  BulkActionParams,
} from './types/src/backend/utils/view-helpers'

export { CurrentAdmin } from './types/src/current-admin.interface'
export { PropertyType } from './types/src/backend/adapters/base-property'
export { ResourceOptions } from './types/src/backend/decorators/resource-options.interface'
export { default as AdminBroOptions } from './types/src/admin-bro-options.interface'
export * from './types/src/admin-bro-options.interface'
export * from './types/src/locale/config'

export * from './types/src/utils/translate-functions.factory'

export { default as PropertyOptions } from './types/src/backend/decorators/property-options.interface'
export { PropertyPlace } from './types/src/backend/decorators/property-json.interface'
export {
  default as Action,
  ActionContext,
  ActionResponse,
  ActionRequest,
  ActionHandler,
  After,
  Before,
  IsFunction,
  RecordActionResponse,
} from './types/src/backend/actions/action.interface'

export { ListActionResponse } from './types/src/backend/actions/list-action'
export { SearchActionResponse } from './types/src/backend/actions/search-action'

export {
  default as withNotice,
  AddNoticeProps,
  NoticeMessage,
} from './types/src/frontend/store/with-notice'

export { default as BaseProperty } from './types/src/backend/adapters/base-property'
export { default as BaseResource } from './types/src/backend/adapters/base-resource'
export { default as BaseDatabase } from './types/src/backend/adapters/base-database'
export { ParamsType, default as BaseRecord } from './types/src/backend/adapters/base-record'

export { default as RecordJSON } from './types/src/backend/decorators/record-json.interface'
export { default as ResourceJSON } from './types/src/backend/decorators/resource-json.interface'
export { default as ActionJSON } from './types/src/backend/decorators/resource-json.interface'
export { default as PropertyJSON } from './types/src/backend/decorators/property-json.interface'
export { default as PageJSON } from './types/src/backend/decorators/page-json.interface'

export { BasePropertyProps, FilterPropertyProps, ShowPropertyProps, EditPropertyProps } from './types/src/frontend/components/property-type/base-property-props'
export { ActionProps } from './types/src/frontend/components/actions/action.props'

export * from './types/src/frontend/components/app'
export * from './types/src/constants'
export * from './types/src/frontend/hooks'

export { default as BasePropertyComponent } from './types/src/frontend/components/property-type'

export {
  AdminBro as default,
  // Actions
  ACTIONS,
}

declare const REDUX_STATE: ReduxState
