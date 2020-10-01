import { AdminBroOptions } from '../../../admin-bro-options.interface'
import { Paths } from '../../../frontend/store/store'

let globalAny: any = {}

try {
  globalAny = window
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error
  }
}

/**
 * Base Params for a any function
 * @alias ActionParams
 * @memberof ViewHelpers
 */
export type ActionParams = {
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
 * Params for a record action
 * @alias RecordActionParams
 * @extends ActionParams
 * @memberof ViewHelpers
 */
export type RecordActionParams = ActionParams & {
  /**
   * Record ID
   */
  recordId: string;
}

/**
 * Params for a bulk action
 * @alias BulkActionParams
 * @extends ActionParams
 * @memberof ViewHelpers
 */
export type BulkActionParams = ActionParams & {
  /**
   * Array of Records ID
   */
  recordIds?: Array<string>;
}

/**
 * Params for a resource action
 * @alias ResourceActionParams
 * @extends ActionParams
 * @memberof ViewHelpers
 */
export type ResourceActionParams = ActionParams

const runDate = new Date()

/**
 * Collection of helper methods available in the views
 */
export class ViewHelpers {
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

  /**
   * Returns url for a `edit` action in given Resource. Uses {@link recordActionUrl}
   *
   * @param {string} resourceId  id to the resource
   * @param {string} recordId    id to the record
   * @param {string} [search]        optional query string
   */
  editUrl(resourceId: string, recordId: string, search?: string): string {
    return this.recordActionUrl({ resourceId, recordId, actionName: 'edit', search })
  }

  /**
   * Returns url for a `show` action in given Resource. Uses {@link recordActionUrl}
   *
   * @param {string} resourceId  id to the resource
   * @param {string} recordId    id to the record
   * @param {string} [search]        optional query string
   */
  showUrl(resourceId: string, recordId: string, search?: string): string {
    return this.recordActionUrl({ resourceId, recordId, actionName: 'show', search })
  }

  /**
   * Returns url for a `delete` action in given Resource. Uses {@link recordActionUrl}
   *
   * @param {string} resourceId  id to the resource
   * @param {string} recordId    id to the record
   * @param {string} [search]        optional query string
   */
  deleteUrl(resourceId: string, recordId: string, search?: string): string {
    return this.recordActionUrl({ resourceId, recordId, actionName: 'delete', search })
  }


  /**
   * Returns url for a `new` action in given Resource. Uses {@link resourceActionUrl}
   *
   * @param {string} resourceId  id to the resource
   * @param {string} [search]        optional query string
   */
  newUrl(resourceId: string, search?: string): string {
    return this.resourceActionUrl({ resourceId, actionName: 'new', search })
  }

  /**
   * Returns url for a `new` action in given Resource. Uses {@link resourceActionUrl}
   *
   * @param {string} resourceId  id to the resource
   * @param {string} [search]        optional query string
   */
  listUrl(resourceId: string, search?: string): string {
    return this.resourceActionUrl({ resourceId, actionName: 'list', search })
  }

  /**
   * Returns url for a `bulkDelete` action in given Resource. Uses {@link bulkActionUrl}
   *
   * @param {string} resourceId  id to the resource
   * @param {Array<string>} recordIds   separated by comma records
   * @param {string} [search]        optional query string
   */
  bulkDeleteUrl(resourceId: string, recordIds: Array<string>, search?: string): string {
    return this.bulkActionUrl({ resourceId, recordIds, actionName: 'bulkDelete', search })
  }

  /**
   * Returns resourceAction url
   *
   * @param   {ResourceActionParams}  options
   * @param   {string}  options.resourceId
   * @param   {string}  options.actionName
   * @param   {string}  [options.search]        optional query string
   *
   * @return  {string}
   */
  resourceActionUrl({ resourceId, actionName, search }: ResourceActionParams): string {
    return this.urlBuilder(['resources', resourceId, 'actions', actionName], search)
  }

  resourceUrl({ resourceId, search }: Omit<ResourceActionParams, 'actionName'>): string {
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
   * @param   {Array<string>}  [options.recordIds]
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
