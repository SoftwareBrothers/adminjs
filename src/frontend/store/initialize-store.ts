import { Store } from 'redux'

import {
  initializeAssets,
  initializeBranding,
  initializeDashboard,
  initializeLocale,
  initializePages,
  initializePaths,
  initializeResources,
  initializeTheme,
  initializeVersions,
  setCurrentAdmin,
} from './actions/index.js'
import createStore, { ReduxState } from './store.js'

import AdminJS from '../../adminjs.js'
import {
  getAssets,
  getBranding,
  getLocales,
  getTheme,
} from '../../backend/utils/options-parser/options-parser.js'
import { CurrentAdmin } from '../../current-admin.interface.js'
import { defaultLocale } from '../../locale/index.js'
import { pagesToStore } from './utils/pages-to-store.js'

export const initializeStore = async (
  admin: AdminJS,
  currentAdmin?: CurrentAdmin,
): Promise<Store<ReduxState>> => {
  const store: Store<ReduxState> = createStore()
  const AdminClass: typeof AdminJS = admin.constructor as typeof AdminJS
  const adminVersion = AdminClass.VERSION

  store.dispatch(
    initializeResources(
      admin.resources.map((resource) => {
        try {
          return resource.decorate().toJSON(currentAdmin)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('error', resource._decorated)
          throw e
        }
      }),
    ),
  )

  const branding = await getBranding(admin, currentAdmin)
  const assets = await getAssets(admin, currentAdmin)
  const locales = await getLocales(admin, currentAdmin)
  const theme = await getTheme(admin, currentAdmin)

  store.dispatch(initializeBranding(branding || {}))
  store.dispatch(initializeLocale(locales || defaultLocale))
  store.dispatch(initializeAssets(assets || {}))
  if (theme) store.dispatch(initializeTheme(theme))

  const { loginPath, logoutPath, rootPath, dashboard, pages, assetsCDN } = admin.options

  store.dispatch(initializePages(pagesToStore(pages)))
  store.dispatch(initializePaths({ loginPath, logoutPath, rootPath, assetsCDN }))
  store.dispatch(setCurrentAdmin(currentAdmin))
  store.dispatch(initializeDashboard(dashboard))
  store.dispatch(
    initializeVersions({
      app: admin.options.version && admin.options.version.app,
      admin: admin.options.version && admin.options.version.admin ? adminVersion : undefined,
    }),
  )
  return store
}

export default initializeStore
