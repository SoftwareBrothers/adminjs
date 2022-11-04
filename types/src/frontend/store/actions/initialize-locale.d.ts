import { Locale } from '../../../locale/config';
export declare const LOCALE_INITIALIZE = "LOCALE_INITIALIZE";
export declare type InitializeLocaleResponse = {
    type: typeof LOCALE_INITIALIZE;
    data: Locale;
};
export declare const initializeLocale: (data: Locale) => InitializeLocaleResponse;
