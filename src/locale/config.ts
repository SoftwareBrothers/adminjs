import type { InitOptions, ResourceKey, ResourceLanguage } from 'i18next'

export type AdminJSLocalesConfig = InitOptions & {
  /**
   * Detect user language
   * learn more: https://github.com/i18next/i18next-browser-languagedetector
   * @default false
   */
  localeDetection?: boolean
  /**
   * Load translation using http -> see /public/locales
   * learn more: https://github.com/i18next/i18next-http-backend
   * @default false
   */
  withBackend?: boolean
}

/**
 * Locale object passed to {@link AdminJSOptions} and stored in the application
 *
 * @memberof AdminJSOptions
 * @alias Locale
 */
export type Locale = AdminJSLocalesConfig & {
  /** Language ISO string like: 'en' 'pl' or 'de' */
  language: string
  /**
   * All the translations.
   */
  translations?: Record<string, LocaleTranslations>
  /**
   * Available languages (array of ISO strings)
   */
  availableLanguages?: string[]
}

type AdminJSLocaleNamespaces =
  | 'actions'
  | 'buttons'
  | 'labels'
  | 'components'
  | 'pages'
  | 'messages'
  | 'properties'

export type LocaleTranslationsBlock = ResourceLanguage &
  Partial<Record<AdminJSLocaleNamespaces, ResourceKey>>

// Locale translations is not well parsed by JSDoc so the typedef is placed below
export type LocaleTranslations = Partial<LocaleTranslationsBlock> & {
  resources?: Record<string, LocaleTranslationsBlock>
}

/**
 * Contains all the translations for given language. Everything is divided to
 * sections/blocks like actions, properties, buttons, labels and messages,
 * but also the same sections can can be nested under 'resources' property.
 *
 * This allows you to define translations either for entire UI or for a specific resource.
 * Take a look at this example:
 *
 * ```javascript
 * {
 *   translations: {
 *     buttons: {
 *       save: 'Save it',
 *     },
 *     resources: {
 *       Comments: {
 *         buttons: {
 *           save: 'Save this comment'
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * In the example above all save buttons will be named: 'Save it'. All but save button in
 * Comments resource. Where the button name will be: Save this comment.
 *
 * @memberof AdminJSOptions
 * @alias LocaleTranslations
 * @typedef {Object} LocaleTranslations
 * @property {Record<string, string>} [actions]         translated action labels
 * @property {Record<string, string>} [properties]      translated resource properties
 * @property {Record<string, string>} [messages]        translated messages
 * @property {Record<string, string>} [buttons]         translated button labels
 * @property {Record<string, string>} [components]      translated components
 * @property {Record<string, string>} [pages]           translated pages
 * @property {Record<string, string>} [labels]          translated labels
 * @property {Record<string, object>} [resources]       optional resources sub-translations
 * @property {Record<string, object>} resources.resourceId  Id of a resource from the database. i.e.
 *                                                      Comments for comments mongoose collection
 * @property {Record<string, string>} [resources.resourceId.actions]
 * @property {Record<string, string>} [resources.resourceId.properties]
 * @property {Record<string, string>} [resources.resourceId.messages]
 * @property {Record<string, string>} [resources.resourceId.buttons]
 * @property {Record<string, string>} [resources.resourceId.labels]
 *
 */
