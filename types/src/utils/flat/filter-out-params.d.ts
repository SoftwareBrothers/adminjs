import { FlattenParams } from './flat.types';
/**
 * @load ./filter-out-params.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string | Array<string>} properties
 * @returns {FlattenParams}
 */
declare const filterOutParams: (params: FlattenParams, properties: string | Array<string>) => FlattenParams;
export { filterOutParams };
