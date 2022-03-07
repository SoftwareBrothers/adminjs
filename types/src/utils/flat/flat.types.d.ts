/**
 * Type of flatten params.
 *
 * @memberof module:flat
 * @alias FlattenParams
 */
export declare type FlattenParams = {
    [key: string]: FlattenValue;
};
export declare type FlattenValue = string | boolean | number | Date | null | [] | {} | File;
/**
 * @memberof module:flat
 * @alias GetOptions
 */
export declare type GetOptions = {
    /**
     * Indicates if all the "less related" siblings should be included. This option takes care of
     * fetching elements in nested arrays. Let's say you have keys: `nested.0.array.0` and `
     * `nested.1.array.0.`. With `includeAllSiblings` you will fetch all nested.N.array elements.
     */
    includeAllSiblings?: boolean;
};
/**
 * Available types for flatten values. This is an Union of types:
 * - `string`
 * - `boolean`
 * - `number`
 * - `Date`
 * - `null`
 * - `[]` (empty array)
 * - `{}` (empty object)
 * - `File`
 * @memberof module:flat
 * @alias FlattenValue
 * @typedef {Union} FlattenValue
 */
