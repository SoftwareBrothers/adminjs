import { Store } from 'redux'
import createStore, {
  initializeResources,
  initializeBranding,
  initializeDashboard,
  initializePaths,
  initializeSession,
  initializeVersions,
  ReduxState,
} from './store'
import AdminBro from '../../admin-bro'
import { CurrentAdmin } from '../../current-admin.interface'

const initializeStore = (admin: AdminBro, currentAdmin: CurrentAdmin): Store<ReduxState> => {
  const store: Store<ReduxState> = createStore()
  const AdminClass: typeof AdminBro = admin.constructor as typeof AdminBro
  const adminVersion = AdminClass.VERSION

  store.dispatch(initializeResources(
    admin.resources.map((r) => {
      try {
        return r.decorate().toJSON(currentAdmin)
      } catch (e) {
        console.log('error', r._decorated)
        throw e
      }
    }),
  ))
  store.dispatch(initializeBranding(admin.options.branding))
  const {
    loginPath, logoutPath, rootPath, dashboard,
  } = admin.options

  store.dispatch(initializePaths({ loginPath, logoutPath, rootPath }))
  store.dispatch(initializeSession(currentAdmin))
  store.dispatch(initializeDashboard(dashboard))
  store.dispatch(initializeVersions({
    app: admin.options.version && admin.options.version.app,
    admin: admin.options.version && admin.options.version.admin ? adminVersion : undefined,
  }))
  return store
}


export default initializeStore
