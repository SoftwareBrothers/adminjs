import merge from 'lodash/merge.js'

import { AdminJSOptions, Assets, BrandingOptions } from '../../../adminjs-options.interface.js'
import AdminJS from '../../../adminjs.js'
import { CurrentAdmin } from '../../../current-admin.interface.js'

import { ThemeInState } from '../../../frontend/store/index.js'
import { Locale, defaultLocale } from '../../../locale/index.js'
import { flat } from '../../../utils/flat/index.js'
import ViewHelpers from '../view-helpers/view-helpers.js'

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
  const { locale = {} } = admin.options || {}
  const computed = typeof locale === 'function' ? await locale(currentAdmin) : locale

  let baseLocale: Locale = merge(
    {} as Partial<Locale>,
    flat.flatten(defaultLocale) as Locale,
    flat.flatten(computed) as Locale,
  )

  if (!baseLocale.translations) {
    baseLocale.translations = {}
  }

  // Merging translations defined in resource options
  admin.resources.forEach((baseResource) => {
    const decorated = baseResource._decorated ?? baseResource.decorate()

    const { translations: resourceTranslations } = decorated.options

    if (resourceTranslations) {
      // Assure that translations object structure is consistent so we can use lodash#merge
      const resourceLocale: Omit<Locale, 'language'> = {
        translations: {},
      }

      Object.keys(resourceTranslations).forEach((language) => {
        resourceLocale.translations![language] = {
          resources: {
            [decorated.id()]: resourceTranslations[language],
          },
        }
      })

      baseLocale = merge(baseLocale, resourceLocale)
    }
  })

  return flat.unflatten(baseLocale)
}

export const getTheme = async (
  admin: AdminJS,
  currentAdmin?: CurrentAdmin,
): Promise<ThemeInState> => {
  const { availableThemes, defaultTheme } = admin.options
  let themeId = defaultTheme ?? availableThemes?.[0].id
  if (currentAdmin?.theme?.length) {
    themeId = currentAdmin?.theme
  }
  const theme = availableThemes?.find(({ id }) => id === themeId)
  return theme ? { ...theme, availableThemes } : null
}

export const getFaviconFromBranding = (branding: BrandingOptions): string => {
  if (branding.favicon) {
    const { favicon } = branding
    const type = favicon.match(/.*\.png$/) ? 'image/png' : 'image/x-icon'
    return `<link rel="shortcut icon" type="${type}" href="${favicon}" />`
  }

  return ''
}
