import { RecordJSON } from '../../../interfaces';
/**
 * Removes selected array item from given record. It performs following tasks:
 * 1. removes array item from the array
 * 2. reorders keys in new array item
 * 3. if property has populated fields it also reorders them
 * it uses {@link flat } module and its removePath method
 *
 * @param {RecordJSON} record
 * @param {string}     subPropertyPath            which has to be removed. It has to be flattened
 *                                                in notation, and ending with array index
 * @private
 * @hide
 */
export declare const removeSubProperty: (record: RecordJSON, subPropertyPath: string) => RecordJSON;
