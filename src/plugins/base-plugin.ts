/* eslint-disable class-methods-use-this */
import { NotImplementedError } from '@adminjs/common/errors'
import AdminJS from '../adminjs'

class BasePlugin<T = Record<string, unknown>> {
  protected admin: AdminJS

  protected options: T

  constructor(admin: AdminJS, options: T) {
    this.admin = admin
    this.options = options
  }

  public buildRoutes() {
    throw new NotImplementedError('BasePlugin#buildRoutes')
  }
}

export default BasePlugin
