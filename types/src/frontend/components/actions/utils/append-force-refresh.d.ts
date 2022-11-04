export declare const REFRESH_KEY = "refresh";
export declare const IGNORE_PARAMS_KEY = "ignore_params";
/**
 * Adds refresh=true to the url, which in turn should cause list to reload.
 *
 * @param {string} url      url to which function should add `refresh`
 * @param {string} [search] optional search query which should be updated,
 *                          if not given function will use window.location.search
 * @private
 */
export declare const appendForceRefresh: (url: string, search?: string) => string;
export declare const hasForceRefresh: (search: string) => boolean;
export declare const removeForceRefresh: (search: string) => string;
