import { BrandingOptions, BrandingOptionsFunction } from '../../..';
import AdminJS from '../../../adminjs';
import { CurrentAdmin } from '../../../current-admin.interface';

class Branding {
  private _admin?: AdminJS;
  private _currentAdmin?: CurrentAdmin;

  constructor(admin?: AdminJS, currentAdmin?: CurrentAdmin) {
    this._admin = admin;
    this._currentAdmin = currentAdmin;
  }

  getSelectableBrandings = () => {
    const availableBrandings = this._admin?.options.brandings;
    if (!availableBrandings) return [];

    return availableBrandings.map(branding => ({
      value: branding,
      name: branding.companyName
    }))
  };

  /**
   * Is action accessible
   * @param {CurrentAdmin} [currentAdmin] Current logged in user
   * @return  {Boolean}
   */
  isAccessible(): boolean {
    return true;
  }

  toJSON = (predicate?: (currentAdmin: CurrentAdmin) => boolean) => {
    const branding = this._admin?.options.branding;
    if (!branding) return null;

    if (!predicate) return branding;

    if (predicate && this._currentAdmin && predicate(this._currentAdmin))
      return branding;

    return null;
  };
}

export default Branding;
