import createStore, {
  initializeResources,
  initializeBranding,
  initializeDashboard,
  initializePaths,
  initializeSession,
  initializeVersions,
} from './store'

const initializeStore = (admin, currentAdmin) => {
  const store = createStore()

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
    admin: admin.options.version && admin.options.version.admin ? admin.constructor.VERSION : null,
  }))
  return store
}


export default initializeStore
