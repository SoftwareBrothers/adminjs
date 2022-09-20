import merge from 'lodash/merge'
import { ResourceJSON, CurrentAdmin } from '@adminjs/common/interfaces'
import { DEFAULT_PATHS } from '@adminjs/common/constants'

import { AdminJSOptionsWithDefault, AdminJSOptions, AdminJSOptionsJson } from './adminjs-options.interface'
import BaseResource from './adapters/resource/base-resource'
import BaseDatabase from './adapters/database/base-database'
import ResourcesFactory from './utils/resources-factory/resources-factory'
import { RecordActionResponse, Action, BulkActionResponse } from './actions/action.interface'
import { ACTIONS } from './actions'
import { ListActionResponse } from './actions/list/list-action'

export const defaultOptions: AdminJSOptionsWithDefault = {
  paths: DEFAULT_PATHS,
  databases: [],
  resources: [],
  dashboard: {},
  pages: {},
}

type ActionsMap = {
  show: Action<RecordActionResponse>;
  edit: Action<RecordActionResponse>;
  delete: Action<RecordActionResponse>;
  bulkDelete: Action<BulkActionResponse>;
  new: Action<RecordActionResponse>;
  list: Action<ListActionResponse>;
}

export type Adapter = { Database: typeof BaseDatabase; Resource: typeof BaseResource }

/**
 * Main class for AdminJS extension. It takes {@link AdminJSOptions} as a
 * parameter and creates an admin instance.
 *
 * Its main responsibility is to fetch all the resources and/or databases given by a
 * user. Its instance is a currier - injected in all other classes.
 *
 * @example
 * const AdminJS = require('adminjs')
 * const admin = new AdminJS(AdminJSOptions)
 */
class AdminJS {
  public resources: Array<BaseResource>

  public options: AdminJSOptionsWithDefault

  /**
   * List of all default actions. If you want to change the behavior for all actions like:
   * _list_, _edit_, _show_, _delete_ and _bulkDelete_ you can do this here.
   *
   * @example <caption>Modifying accessibility rules for all show actions</caption>
   * const { ACTIONS } = require('adminjs')
   * ACTIONS.show.isAccessible = () => {...}
   */
  public static ACTIONS: ActionsMap

  /**
   * AdminJS version
   */
  public static VERSION: string

  public static RegisteredAdapters: Adapter[] = []

  /**
   * @param   {AdminJSOptions} options      Options passed to AdminJS
   */
  constructor(options: AdminJSOptions = {}) {
    /**
     * @type {BaseResource[]}
     * @description List of all resources available for the AdminJS.
     * They can be fetched with the {@link AdminJS#findResource} method
     */
    this.resources = []

    /**
     * @type {AdminJSOptions}
     * @description Options given by a user
     */
    this.options = merge({}, defaultOptions, options)

    const { databases, resources } = this.options
    const resourcesFactory = new ResourcesFactory(this, AdminJS.RegisteredAdapters || [])
    this.resources = resourcesFactory.buildResources({ databases, resources })
  }

  /**
   * Registers various database adapters written for AdminJS.
   *
   * @example
   * const AdminJS = require('adminjs')
   * const MongooseAdapter = require('adminjs-mongoose')
   * AdminJS.registerAdapter(MongooseAdapter)
   *
   * @param  {Object}       options
   * @param  {typeof BaseDatabase} options.Database subclass of {@link BaseDatabase}
   * @param  {typeof BaseResource} options.Resource subclass of {@link BaseResource}
   */
  static registerAdapter({ Database, Resource }: {
    Database: typeof BaseDatabase;
    Resource: typeof BaseResource;
  }): void {
    if (!Database || !Resource) {
      throw new Error('Adapter has to have both Database and Resource')
    }

    AdminJS.RegisteredAdapters = AdminJS.RegisteredAdapters || []
    AdminJS.RegisteredAdapters.push({ Database, Resource })
  }

  /**
   * Returns resource base on its ID
   *
   * @example
   * const User = admin.findResource('users')
   * await User.findOne(userId)
   *
   * @param  {String} resourceId    ID of a resource defined under {@link BaseResource#id}
   * @return {BaseResource}         found resource
   * @throws {Error}                When resource with given id cannot be found
   */
  findResource(resourceId): BaseResource {
    const resource = this.resources.find((m) => m._decorated?.id() === resourceId)
    if (!resource) {
      throw new Error([
        `There are no resources with given id: "${resourceId}"`,
        'This is the list of all registered resources you can use:',
        this.resources.map((r) => r._decorated?.id() || r.id()).join(', '),
      ].join('\n'))
    }
    return resource
  }

  async toJSON(currentAdmin?: CurrentAdmin): Promise<AdminJSOptionsJson> {
    let jsonResources: ResourceJSON[] = []
    try {
      jsonResources = this.resources.map((r) => r.decorate().toJSON(currentAdmin))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
    const pages = Object.entries(this.options.pages ?? {})
      .map(([key, info]) => ({
        name: key,
        hasHandler: !!info.handler,
      }))
    const { rootPath } = this.options.paths
    const paths = Object.entries(this.options.paths ?? {})
      .reduce((memo, [pathName, pathString]) => {
        if (pathName === rootPath) return memo
        memo[pathName] = pathString.replace(rootPath, '')

        return memo
      }, {})

    return {
      resources: jsonResources,
      paths: paths as AdminJSOptionsJson['paths'],
      pages,
    }
  }
}

AdminJS.RegisteredAdapters = []
AdminJS.ACTIONS = ACTIONS

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AdminJS {}

export const { registerAdapter } = AdminJS

export default AdminJS
