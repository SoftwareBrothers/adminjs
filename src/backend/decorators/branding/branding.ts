import { BrandingOptions, BrandingOptionsFunction } from 'src'
import AdminJS from '../../../adminjs'
import { CurrentAdmin } from '../../../current-admin.interface'

class Branding {
  private _admin?: AdminJS;

  private _currentAdmin?: CurrentAdmin;

  constructor(admin?: AdminJS, currentAdmin?: CurrentAdmin) {
    this._admin = admin
    this._currentAdmin = currentAdmin
  }

  toJSON = (
    predicate?: (currentAdmin: CurrentAdmin) => boolean,
  ): BrandingOptions | BrandingOptionsFunction | null => {
    const branding = this._admin?.options.branding
    if (!branding) return null

    if (!predicate) return branding

    if (predicate && this._currentAdmin && predicate(this._currentAdmin)) { return branding }

    return null
  };
}

export default Branding
