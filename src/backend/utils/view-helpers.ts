import AdminBroOptions from '../../admin-bro-options.interface'
import { Paths } from '../../frontend/store/store'

let globalAny: any = {}

try {
  globalAny = window
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error
  }
}

/**
 * Params for a record action
 * @alias RecordActionParams
 * @memberof ViewHelpers
 */
export type RecordActionParams = {
  resourceId: string;
  actionName: string;
  recordId: string;
}

/**
 * Params for a resource action
 * @alias ResourceActionParams
 * @memberof ViewHelpers
 */
export type ResourceActionParams = {
  resourceId: string;
  actionName: string;
}

/**
 * Collection of helper methods available in the views
 */
class ViewHelpers {
  public options: Paths

  constructor({ options }: { options?: AdminBroOptions } = {}) {
    let opts: Paths = options || (globalAny.REDUX_STATE && globalAny.REDUX_STATE.paths)

    opts = opts || {
      rootPath: '/admin',
    }

    // when ViewHelpers are used on the frontend, paths are taken from global Redux State
    this.options = opts
  }

  /**
   * To each related path adds rootPath passed by the user, as well as a query string
   * @private
   * @param  {Array<string>} paths   list of parts of the url
   * @return {string}       path
   */
  urlBuilder(paths: Array<string>): string {
    const { rootPath } = this.options
    return `${rootPath}/${paths.join('/')}`
  }

  /**
   * Returns login URL
   * @return {string}
   */
  loginUrl(): string {
    return this.options.loginPath
  }

  /**
   * Returns logout URL
   * @return {string}
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
   * @return {string}
   */
  dashboardUrl(): string {
    return this.options.rootPath
  }

  /**
   * Returns resourceAction url
   *
   * @param   {ResourceActionParams}  options
   * @param   {string}  options.resourceId
   * @param   {string}  options.actionName
   *
   * @return  {string}
   */
  resourceActionUrl({ resourceId, actionName }: ResourceActionParams): string {
    return this.urlBuilder(['resources', resourceId, 'actions', actionName])
  }

  /**
   * Returns recordAction url
   *
   * @param   {RecordActionParams}  options
   * @param   {string}  options.resourceId
   * @param   {string}  options.recordId
   * @param   {string}  options.actionName
   *
   * @return  {string}
   */
  recordActionUrl({ resourceId, recordId, actionName }: RecordActionParams): string {
    return this.urlBuilder(['resources', resourceId, 'records', recordId, actionName])
  }

  /**
   * Returns absolute path to a given asset.
   * @private
   *
   * @param  {string} asset
   * @return {string}
   */
  assetPath(asset: string): string {
    return this.urlBuilder(['frontend', 'assets', asset])
  }
}

export default ViewHelpers
