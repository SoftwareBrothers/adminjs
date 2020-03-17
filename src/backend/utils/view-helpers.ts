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
  /**
   * Unique Resource ID
   */
  resourceId: string;
  /**
   * Action name
   */
  actionName: string;
  /**
   * Record ID
   */
  recordId: string;
  /**
   * Optional query string: ?....
   */
  search? : string;
}

/**
 * Params for a bulk action
 * @alias BulkActionParams
 * @memberof ViewHelpers
 */
export type BulkActionParams = {
  /**
   * Unique Resource ID
   */
  resourceId: string;
  /**
   * Action name
   */
  actionName: string;
  /**
   * Array of Records ID
   */
  recordIds?: Array<string>;
  /**
   * Optional query string: ?....
   */
  search? : string;
}

/**
 * Params for a resource action
 * @alias ResourceActionParams
 * @memberof ViewHelpers
 */
export type ResourceActionParams = {
  /**
   * Unique Resource ID
   */
  resourceId: string;
  /**
   * Action name
   */
  actionName: string;
  /**
   * Optional query string: ?....
   */
  search? : string;
}

/**
 * Params for a resource list
 * @alias ResourceParams
 * @memberof ViewHelpers
 */
export type ResourceParams = {
  /**
   * Unique Resource ID
   */
  resourceId: string;
  /**
   * Action name
   */
  search? : string;
}

const runDate = new Date()

/**
 * Collection of helper methods available in the views
 */
class ViewHelpers {
  public options: Paths

  constructor({ options }: { options?: AdminBroOptions } = {}) {
    let opts: Paths = ViewHelpers.getPaths(options)

    opts = opts || {
      rootPath: '/admin',
    }

    // when ViewHelpers are used on the frontend, paths are taken from global Redux State
    this.options = opts
  }

  static getPaths(options?: AdminBroOptions): Paths {
    return options || (globalAny.REDUX_STATE?.paths)
  }

  /**
   * To each related path adds rootPath passed by the user, as well as a query string
   * @private
   * @param  {Array<string>} [paths]      list of parts of the url
   * @return {string}       path
   * @return {query}        [search=''] query string which can be fetch
   *                                    from `location.search`
   */
  urlBuilder(paths: Array<string> = [], search = ''): string {
    const separator = '/'
    const replace = new RegExp(`${separator}{1,}`, 'g')

    let { rootPath } = this.options
    if (!rootPath.startsWith(separator)) { rootPath = `${separator}${rootPath}` }

    const parts = [rootPath, ...paths]
    return `${parts.join(separator).replace(replace, separator)}${search}`
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

  /**
   * Returns URL for the dashboard
   * @return {string}
   */
  dashboardUrl(): string {
    return this.options.rootPath
  }

  /**
   * Returns URL for given page name
   * @param {string} pageName       page name which is a unique key specified in
   *                                {@link AdminBroOptions}
   * @return {string}
   */
  pageUrl(pageName: string): string {
    return this.urlBuilder(['pages', pageName])
  }

  designSystemUrl(): string {
    return this.urlBuilder(['design-system'])
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
  resourceActionUrl({ resourceId, actionName, search }: ResourceActionParams): string {
    return this.urlBuilder(['resources', resourceId, 'actions', actionName], search)
  }

  resourceUrl({ resourceId, search }: ResourceParams): string {
    return this.urlBuilder(['resources', resourceId], search)
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
  recordActionUrl({ resourceId, recordId, actionName, search }: RecordActionParams): string {
    return this.urlBuilder(['resources', resourceId, 'records', recordId, actionName], search)
  }

  /**
   * Returns bulkAction url
   *
   * @param   {BulkActionParams}  options
   * @param   {string}  options.resourceId
   * @param   {string}  [options.recordIds]
   * @param   {string}  options.actionName
   *
   * @return  {string}
   */
  bulkActionUrl({ resourceId, recordIds, actionName, search }: BulkActionParams): string {
    const url = this.urlBuilder([
      'resources', resourceId, 'bulk', actionName,
    ])
    if (recordIds && recordIds.length) {
      const query = new URLSearchParams(search)
      query.set('recordIds', recordIds.join(','))
      return `${url}?${query.toString()}`
    }
    return `${url}${search || ''}`
  }

  /**
   * Returns absolute path to a given asset.
   * @private
   *
   * @param  {string} asset
   * @return {string}
   */
  assetPath(asset: string): string {
    if (this.options.assetsCDN) {
      const url = new URL(asset, this.options.assetsCDN).href

      // adding timestamp to the href invalidates the CDN cache
      return `${url}?date=${runDate.getTime()}`
    }
    return this.urlBuilder(['frontend', 'assets', asset])
  }
}

export default ViewHelpers
