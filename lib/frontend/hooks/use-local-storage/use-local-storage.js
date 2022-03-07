"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useLocalStorage = useLocalStorage;

var _react = require("react");

/* eslint-disable no-console */

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
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = (0, _react.useState)(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key); // Parse stored json or if none return initialValue

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  }); // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.

  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value; // Save state

      setStoredValue(valueToStore); // Save to local storage

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

var _default = useLocalStorage;
exports.default = _default;