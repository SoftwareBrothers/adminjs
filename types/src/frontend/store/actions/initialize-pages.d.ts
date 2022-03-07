import { AdminPage } from '../../../adminjs-options.interface';
export declare const PAGES_INITIALIZE = "PAGES_INITIALIZE";
export declare type InitializePagesResponse = {
    type: typeof PAGES_INITIALIZE;
    data: Array<AdminPage>;
};
export declare const initializePages: (data: Array<AdminPage>) => InitializePagesResponse;
