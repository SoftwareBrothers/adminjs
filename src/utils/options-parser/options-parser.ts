import merge from 'lodash/merge'
import { CurrentAdmin } from '@adminjs/common/interfaces'

import AdminJS from '../../adminjs'
import { AdminJSOptions, BrandingOptions } from '../../adminjs-options.interface'

const defaultBranding: AdminJSOptions['branding'] = {
  companyName: 'Company',
}

export const getBranding = async (
  admin: AdminJS,
  currentAdmin?: CurrentAdmin,
): Promise<BrandingOptions> => {
  const { branding } = admin.options

  const computed = typeof branding === 'function'
    ? await branding(currentAdmin)
    : branding
  const merged = merge({}, defaultBranding, computed)

  return merged
}
