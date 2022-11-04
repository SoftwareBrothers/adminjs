import { PathParts } from './path-parts.type';
/**
 * @memberof module:flat
 * @alias PathToPartsOptions
 */
export declare type PathToPartsOptions = {
    /**
     * Indicates if array indexes should be skipped from the outcome.
     */
    skipArrayIndexes?: boolean;
};
/**
 * @load ./path-to-parts.doc.md
 * @param   {string}              propertyPath
 * @param   {PathToPartsOptions}  options
 * @returns  {PathParts}
 *
 * @memberof module:flat
 * @alias pathToParts
 */
declare const pathToParts: (propertyPath: string, options?: PathToPartsOptions) => PathParts;
export { pathToParts };
