import { FlattenParams } from '../flat';
import { GetOptions } from './flat.types';
/**
 * @load ./get.doc.md
 * @memberof module:flat
 * @param {FlattenParams}   params      flatten params from which property has to be taken
 * @param {string}          [propertyPath]  name of the property
 * @param {GetOptions}      options     options
 * @returns {any}                       when property key exists directly it returns what is inside,
 *                                      otherwise it tries to find any nested objects and returns
 *                                      them
 */
declare const get: (params?: FlattenParams, propertyPath?: string | undefined, options?: GetOptions | undefined) => any;
export { get };
