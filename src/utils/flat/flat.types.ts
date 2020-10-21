/**
 * Type of flatten params.
 *
 * @memberof flat
 * @alias FlattenParams
 */
export type FlattenParams = {
  [key: string]: FlattenValue;
}

export type FlattenValue = string | boolean | number | Date | null | [] | {} | File

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
 * @memberof flat
 * @alias FlattenValue
 * @typedef {Union} FlattenValue
 */
