import { RecordJSON } from '../../interfaces';
/**
 * HOF returning a function which takes a record and returns an updated record.
 * This way we can pass this to setState in react, which takes old state
 * (in our case previousRecord) as an argument.
 *
 * Function is used when to the {@link OnPropertyChange} callback, user passes
 * key (property name) and the value (followed by an optional selectedRecord).
 *
 * The responsibility of the function is to:
 * - clear old values under passed key: so when user passes property === `some.key`
 *   function removes `some.key.1`, `some.key.2` etc
 * - sets new value under the passed key for primitive types
 * - in case of objects - it flattens them first and then sets all the resulted values
 *   under the path provided in the property argument
 * - it fills value in RecordJSON#populated when selectedRecord is given
 * - finally it invalidates populated for given property
 *
 *
 * @param {string}      property        property that must be updated, supports nesting
 *                                      with dots
 * @param {any}         value           value that must be set, undefined or null if
 *                                      deleting, will be flattened
 * @param {RecordJSON}  selectedRecord  if value is reference ID, this must be a record
 *                                      it's referencing to
 * @private
 */
export declare const updateRecord: (property: string, value: any, selectedRecord?: RecordJSON | undefined) => (previousRecord: RecordJSON) => RecordJSON;
export default updateRecord;
