import merge from 'lodash/merge'
import AdminJS from '../../../adminjs'
import { AdminJSOptions, Assets, BrandingOptions } from '../../../adminjs-options.interface'
import { CurrentAdmin } from '../../../current-admin.interface'
import ViewHelpers from '../view-helpers/view-helpers'


const defaultBranding: AdminJSOptions['branding'] = {
  companyName: 'Company',
  withMadeWithLove: true,
}
const defaultAssets = {
  styles: [],
  scripts: [],
}

export const getAssets = async (
  admin: AdminJS,
  currentAdmin?: CurrentAdmin,
): Promise<Assets> => {
  const { assets } = admin.options || {}
  const computed = typeof assets === 'function'
    ? await assets(currentAdmin)
    : assets

  return merge({}, defaultAssets, computed)
}

export const getBranding = async (
  admin: AdminJS,
  currentAdmin?: CurrentAdmin,
): Promise<BrandingOptions> => {
  const { branding } = admin.options

  const h = new ViewHelpers(admin)
  const defaultLogo = h.assetPath('logo.svg')

  const computed = typeof branding === 'function'
    ? await branding(currentAdmin)
    : branding
  const merged = merge({}, defaultBranding, computed)

  // checking for undefined because logo can also be `false` or `null`
  merged.logo = merged.logo !== undefined ? merged.logo : defaultLogo

  return merged
}

export const getFaviconFromBranding = (branding: BrandingOptions): string => {
  if (branding.favicon) {
    const { favicon } = branding
    const type = favicon.match(/.*\.png$/) ? 'image/png' : 'image/x-icon'
    return `<link rel="shortcut icon" type="${type}" href="${favicon}" />`
  }

  return ''
}
