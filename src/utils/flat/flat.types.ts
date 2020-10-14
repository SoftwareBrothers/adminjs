
/**
 * Available fo flatten value
 *
 * @memberof module:flat
 */
export type FlattenValue = 'string' |
  'boolean' |
  'number' |
  Date |
  null |
  [] |
  {} |
  File

/**
 * Type of flatten params
 *
 * @memberof module:flat
 */
export type FlattenParams = {
  [key: string]: FlattenValue;
}
