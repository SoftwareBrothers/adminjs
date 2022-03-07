import { UseLocalStorageResult } from './use-local-storage-result.type';
/**
 * @load ./use-local-storage.doc.md
 * @subcategory Hooks
 * @class
 * @see https://usehooks.com/useLocalStorage
 *
 * @param {string} key          key under which hook will store the data
 * @param {T}      initialValue    value which will be stringified and stored
 * @return {UseLocalStorageResult<T>}
 * @new In version 3.3
 * @bundle
 * @type {Function}
 */
export declare function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageResult<T>;
export default useLocalStorage;
