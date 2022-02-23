import { BrandingOptions } from '../../..';
import AdminJS from '../../../adminjs';
import { CurrentAdmin } from '../../../current-admin.interface';

class Branding {
  private _admin?: AdminJS;
  private _currentAdmin?: CurrentAdmin;

  constructor(admin?: AdminJS, currentAdmin?: CurrentAdmin) {
    this._admin = admin;
    this._currentAdmin = currentAdmin;
  }

  /**
   * Is action accessible
   * @param {CurrentAdmin} [currentAdmin] Current logged in user
   * @return  {Boolean}
   */
  isAccessible(): boolean {
    return true;
  }

  toJSON = (): BrandingOptions => {
    // if (!predicate) return branding normalnie

    // if (predicate && predicate(this._currentAdmin)) return branding normalnie

    // return null
    const branding = this._admin?.options.branding;
    return { ...branding } as BrandingOptions;
  };
}

export default Branding;
