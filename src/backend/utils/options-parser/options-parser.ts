import merge from 'lodash/merge.js'

import AdminJS from '../../../adminjs.js'
import { AdminJSOptions, Assets, BrandingOptions, ThemeConfig } from '../../../adminjs-options.interface.js'
import { CurrentAdmin } from '../../../current-admin.interface.js'
import ViewHelpers from '../view-helpers/view-helpers.js'
import { defaultLocale, Locale } from '../../../locale/index.js'

const defaultBranding: AdminJSOptions['branding'] = {
  companyName: 'Company',
  withMadeWithLove: true,
}
const defaultAssets: Assets = {
  styles: [],
  scripts: [],
}

export const getAssets = async (admin: AdminJS, currentAdmin?: CurrentAdmin): Promise<Assets> => {
  const { assets } = admin.options || {}
  const computed = typeof assets === 'function' ? await assets(currentAdmin) : assets

  return merge({}, defaultAssets, computed)
}

export const getBranding = async (
  admin: AdminJS,
  currentAdmin?: CurrentAdmin,
): Promise<BrandingOptions> => {
  const { branding } = admin.options

  const h = new ViewHelpers(admin)
  const defaultLogo = h.assetPath('logo.svg')

  const computed = typeof branding === 'function' ? await branding(currentAdmin) : branding
  const merged = merge({}, defaultBranding, computed)

  // checking for undefined because logo can also be `false` or `null`
  merged.logo = merged.logo !== undefined ? merged.logo : defaultLogo

  return merged
}

export const getLocales = async (admin: AdminJS, currentAdmin?: CurrentAdmin): Promise<Locale> => {
  const { locale } = admin.options || {}
  const computed = typeof locale === 'function' ? await locale(currentAdmin) : locale

  return merge({}, defaultLocale, computed)
}

export const getTheme = async (
  admin: AdminJS,
  currentAdmin?: CurrentAdmin,
): Promise<ThemeConfig | null> => {
  const { availableThemes, defaultTheme } = admin.options
  const themeId = currentAdmin?.theme ?? defaultTheme ?? availableThemes?.[0].id
  const theme = availableThemes?.find((t) => t.id === themeId)
  return theme ?? null
}

export const getFaviconFromBranding = (branding: BrandingOptions): string => {
  if (branding.favicon) {
    const { favicon } = branding
    const type = favicon.match(/.*\.png$/) ? 'image/png' : 'image/x-icon'
    return `<link rel="shortcut icon" type="${type}" href="${favicon}" />`
  }

  return ''
}
