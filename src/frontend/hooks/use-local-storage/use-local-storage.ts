/* eslint-disable no-console */
import React, { useState } from 'react'
import { UseLocalStorageResult } from './use-local-storage-result.type'

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
export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageResult<T> {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
