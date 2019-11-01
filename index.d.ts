import AdminBro from './types/src/admin-bro'
import AdminBroOptions from './types/src/admin-bro-options.interface'
import { ResourceOptions } from './types/src/backend/decorators/resource-options.interface'
import PropertyOptions from './types/src/backend/decorators/property-options.interface'
import Action from './types/src/backend/actions/action.interface'
import { CurrentAdmin } from './types/src/current-admin.interface'

import BaseProperty from './types/src/backend/adapters/base-property'
import BaseResource from './types/src/backend/adapters/base-resource'
import BaseDatabase from './types/src/backend/adapters/base-database'
import BaseRecord from './types/src/backend/adapters/base-record'
import Router from './types/src/backend/router'
import Filter from './types/src/backend/utils/filter'
import ValidationError from './types/src/backend/utils/validation-error'
import ApiClient from './types/src/frontend/utils/api-client'
import * as ACTIONS from './types/src/backend/actions/index'
import { ReduxState } from './types/src/frontend/store/store'

export * from './types/src/frontend/components/ui'
export * from './types/src/frontend/components/app'

export {
  AdminBro as default,

  // Base
  BaseProperty,
  BaseResource,
  BaseDatabase,
  BaseRecord,

  // Classes
  Router,
  Filter,
  ValidationError,
  ApiClient,

  // Actions
  ACTIONS,

  // Types
  CurrentAdmin,
  AdminBroOptions,
  ResourceOptions,
  PropertyOptions,
  Action,
}

declare const REDUX_STATE: ReduxState
