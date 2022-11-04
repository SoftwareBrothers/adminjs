import { FlattenParams } from './flat.types';
/**
 * @load ./remove-path.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {...string} properties
 * @returns {FlattenParams}
 */
declare const removePath: (params: FlattenParams, path: string) => FlattenParams;
export { removePath };
