
/**
 * NonNullishPartialRecord
 * @private
 * Allows creating a type based on mapped type K that holds a value o type V (`string` by default)
 * That makes all keys from mapped type optional but requires so that they have value.
 * { } // ok
 * { x: 1, y: 2 } // ok
 * { x: 1 } // ok
 * { x: 1, y: undefined } // error
 */
export type NonNullishPartialRecord<K, V = string> =
{ [key in keyof K]?: V } & { [key: string]: V }
