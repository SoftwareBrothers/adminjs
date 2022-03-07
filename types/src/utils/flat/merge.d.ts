import { FlattenParams } from './flat.types';
/**
 * Merges params together and returns flatten result
 *
 * @param {any} params
 * @param {Array<any>} ...mergeParams
 * @returns {FlattenParams}
 * @memberof module:flat
 */
declare const merge: (params?: any, ...mergeParams: Array<any>) => FlattenParams;
export { merge };
