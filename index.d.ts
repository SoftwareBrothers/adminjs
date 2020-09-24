import AdminBro from './types/src'

import { ReduxState } from './types/src/frontend/store/store'

export * from './types/src'

export * from './types/src/frontend/store/store'
export * from './types/src/frontend/utils/overridable-component'

export {
  default as ApiClient,
  RecordActionAPIParams,
  ResourceActionAPIParams,
  GetPageAPIParams,
} from './types/src/frontend/utils/api-client'

export {
  default as withNotice,
  AddNoticeProps,
  NoticeMessage,
} from './types/src/frontend/store/with-notice'


export { default as RecordJSON } from './types/src/frontend/types/record-json.interface'
export { default as ResourceJSON } from './types/src/frontend/types/resource-json.interface'
export { default as ActionJSON } from './types/src/frontend/types/resource-json.interface'
export { default as PropertyJSON } from './types/src/frontend/types/property-json.interface'
export { default as PageJSON } from './types/src/frontend/types/page-json.interface'

export { BasePropertyProps, FilterPropertyProps, ShowPropertyProps, EditPropertyProps } from './types/src/frontend/components/property-type/base-property-props'
export { ActionProps } from './types/src/frontend/components/actions/action.props'

export * from './types/src/frontend/components/app'
export * from './types/src/frontend/hooks'

export { default as BasePropertyComponent } from './types/src/frontend/components/property-type'

export {
  AdminBro as default,
}

declare const REDUX_STATE: ReduxState
