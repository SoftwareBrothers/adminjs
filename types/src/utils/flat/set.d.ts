import { FlattenParams } from '../flat';
/**
 * @load ./set.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string} propertyPath
 * @param {any} [value]       if not give function will only try to remove old keys
 * @returns {FlattenParams}
 */
declare const set: (params: FlattenParams | undefined, propertyPath: string, value?: any) => FlattenParams;
export { set };
