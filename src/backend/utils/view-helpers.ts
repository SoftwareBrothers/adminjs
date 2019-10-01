import AdminBroOptions from '../../admin-bro-options.interface'

let globalAny: any = {}

try {
  globalAny = window
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error
  }
}

/**
 * Collection of helper methods available in the views
 */
export default class ViewHelpers {
  public options

  constructor({ options }: { options?: AdminBroOptions } = {}) {
    let opts = options || (globalAny.REDUX_STATE && globalAny.REDUX_STATE.paths)

    opts = opts || {
      rootPath: '/admin',
    }

    // when ViewHelpers are used on the frontend, paths are taken from global Redux State
    this.options = opts
  }

  /**
   * To each related path adds rootPath passed by the user, as well as a query string
   * @param  {String[]} paths   list of parts of the url
   * @return {String}       path
   */
  urlBuilder(paths): string {
    const { rootPath } = this.options
    return `${rootPath}/${paths.join('/')}`
  }

  /**
   * Returns login URL
   * @return {String}
   */
  loginUrl(): string {
    return this.options.loginPath
  }

  /**
   * Returns logout URL
   * @return {String}
   */
  logoutUrl(): string {
    return this.options.logoutPath
  }

  listUrl({ resourceId }): string {
    console.warn(`
      Deprecation: this "ViewHelpers#listUrl" will be removed in the next versions.
      Please use "resourceActionUrl({ resourceId, actionName: 'list'})"
      instead`)
    return this.resourceActionUrl({ resourceId, actionName: 'list' })
  }

  /**
   * Returns URL for the dashboard
   * @return {String}
   */
  dashboardUrl(): string {
    return this.options.rootPath
  }

  resourceActionUrl({ resourceId, actionName }): string {
    return this.urlBuilder(['resources', resourceId, 'actions', actionName])
  }

  recordActionUrl({ resourceId, recordId, actionName }): string {
    return this.urlBuilder(['resources', resourceId, 'records', recordId, actionName])
  }

  /**
   * Returns absolute path to a given asset
   * @param  {String} asset
   * @return {String}
   */
  assetPath(asset): string {
    return this.urlBuilder(['frontend', 'assets', asset])
  }
}
