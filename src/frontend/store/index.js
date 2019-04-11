import createStore, {
  initializeResources,
  initializeBranding,
  initializeDashboard,
  initializePaths,
  initializeSession,
} from './store'

const initializeStore = (admin, currentAdmin) => {
  const store = createStore()
  store.dispatch(initializeResources(
    admin.resources.map(r => r.decorate().toJSON())
  ))
  store.dispatch(initializeBranding(admin.options.branding))
  const { loginPath, logoutPath, rootPath, dashboard } = admin.options

  store.dispatch(initializePaths({ loginPath, logoutPath, rootPath }))
  store.dispatch(initializeSession(currentAdmin))
  store.dispatch(initializeDashboard(dashboard))
  return store
}


export default initializeStore
