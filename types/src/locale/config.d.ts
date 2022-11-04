/**
 * Locale object passed to {@link AdminJSOptions} and stored in the application
 *
 * @memberof AdminJSOptions
 * @alias Locale
 */
export declare type Locale = {
    /** Language ISO string like: 'en' 'pl' or 'de' */
    language: string;
    /**
     * All the translations.
     */
    translations: Partial<LocaleTranslations>;
};
export declare type LocaleTranslationsBlock = {
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
};
export declare type LocaleTranslations = Partial<LocaleTranslationsBlock> & {
    resources?: {
        [key: string]: Partial<LocaleTranslationsBlock>;
    };
};
export declare const combineTranslations: (originalTranslations: LocaleTranslations, adminTranslations?: Partial<LocaleTranslations>) => LocaleTranslations;
