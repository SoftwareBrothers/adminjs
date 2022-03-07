import { FlattenParams, GetOptions } from './flat.types';
/**
 * @load ./select-params.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string | Array<string>} properties
 * @param {GetOptions} [options]
 * @returns {FlattenParams}
 */
declare const selectParams: (params: FlattenParams, properties: string | Array<string>, options?: GetOptions | undefined) => FlattenParams;
export { selectParams };
