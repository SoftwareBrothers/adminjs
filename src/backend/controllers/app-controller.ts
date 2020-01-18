/* eslint-disable no-unused-vars */
import ViewHelpers from '../utils/view-helpers'
import componentsBundler from '../bundler/user-components-bundler'
import layoutTemplate from '../../frontend/layout-template'
import { ActionRequest } from '../actions/action.interface'
import AdminBro from '../../admin-bro'
import { CurrentAdmin } from '../../current-admin.interface'

export default class AppController {
  private _admin: AdminBro

  private h: ViewHelpers

  private currentAdmin: CurrentAdmin

  constructor({ admin }, currentAdmin) {
    this._admin = admin
    this.h = new ViewHelpers(admin)
    this.currentAdmin = currentAdmin
  }

  async index(): Promise<string> {
    return layoutTemplate(this._admin, this.currentAdmin, '')
  }

  async designSystem(): Promise<string> {
    const href = this.h.designSystemUrl()
    return layoutTemplate(this._admin, this.currentAdmin, href)
  }

  async resourceAction({ params }: ActionRequest): Promise<string> {
    const { resourceId, actionName } = params
    const href = this.h.resourceActionUrl({ resourceId, actionName })
    return layoutTemplate(this._admin, this.currentAdmin, href)
  }

  async bulkAction({ params }: ActionRequest): Promise<string> {
    const { resourceId, actionName } = params
    const href = this.h.bulkActionUrl({ resourceId, actionName })
    return layoutTemplate(this._admin, this.currentAdmin, href)
  }

  async resource({ params }: ActionRequest): Promise<string> {
    const { resourceId } = params
    const href = this.h.resourceUrl({ resourceId })
    return layoutTemplate(this._admin, this.currentAdmin, href)
  }

  async recordAction({ params }: ActionRequest): Promise<string> {
    const { resourceId, actionName, recordId } = params
    if (!recordId) {
      throw new Error('you have to give "recordId" in the request parameters')
    }
    const href = this.h.recordActionUrl({ resourceId, actionName, recordId })
    return layoutTemplate(this._admin, this.currentAdmin, href)
  }

  async page({ params }: ActionRequest): Promise<string> {
    const { pageName } = params
    if (!pageName) {
      throw new Error('you have to give "pageName" in the request parameters')
    }
    const href = this.h.pageUrl(pageName)
    return layoutTemplate(this._admin, this.currentAdmin, href)
  }

  async bundleComponents(): Promise<string> {
    return componentsBundler(this._admin)
  }
}
