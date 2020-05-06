import merge from 'lodash/merge'
import { formatName } from '../utils/translate-functions.factory'

/**
 * Locale object passed to {@link AdminBroOptions} and stored in the application
 *
 * @memberof AdminBroOptions
 * @alias Locale
 */
export type Locale = {
  /** Language ISO string like: 'en' 'pl' or 'de' */
  language: string;
  /**
   * All the translations.
   */
  translations: Partial<LocaleTranslations>;
}

export type LocaleTranslationsBlock = {
  actions: {
    [key: string]: string;
  };
  buttons: {
    [key: string]: string;
  };
  labels: {
    [key: string]: string;
  };
  messages: {
    [key: string]: string;
  };
  properties: {
    [key: string]: string;
  };
}

// Locale translations is not well parsed by JSDoc so the typedef is placed below
export type LocaleTranslations = Partial<LocaleTranslationsBlock> & {
  resources?: {
    [key: string]: Partial<LocaleTranslationsBlock>;
  };
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
 * @memberof AdminBroOptions
 * @alias LocaleTranslations
 * @typedef {Object} LocaleTranslations
 * @property {Record<string, string>} [actions]         translated action labels
 * @property {Record<string, string>} [properties]      translated resource properties
 * @property {Record<string, string>} [messages]        translated messages
 * @property {Record<string, string>} [buttons]         translated button labels
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

// Escaping all keys with . (changing to '&#46;')
const renameKeys = (object: Partial<LocaleTranslations>): Partial<LocaleTranslations> => (
  Object.entries(object).reduce((memo, [k, v]) => {
    if (typeof v === 'object') {
      return {
        ...memo,
        [formatName(k)]: renameKeys(v),
      }
    }
    return {
      ...memo,
      [formatName(k)]: v,
    }
  }, {})
)

export const combineTranslations = (
  originalTranslations: LocaleTranslations,
  adminTranslations: Partial<LocaleTranslations> = {},
): LocaleTranslations => {
  const formattedTranslations = renameKeys(adminTranslations)
  return merge(originalTranslations, formattedTranslations)
}
