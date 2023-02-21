import React from 'react'

export type UseLocalStorageResult<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>
];

/**
 * Result of the {@link useLocalStorage}.
 * It is a tuple containing value and the setter
 *
 * @typedef {Array} UseLocalStorageResult
 * @memberof useLocalStorage
 * @alias UseLocalStorageResult
 * @property {T} [0]    the value stored in the local store
 * @property {React.Dispatch<React.SetStateAction<T>>} [1]    value setter compatible with react
 *                                                            useState
 */
