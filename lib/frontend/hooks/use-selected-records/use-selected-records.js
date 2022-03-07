"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelectedRecords = exports.default = useSelectedRecords;

var _react = require("react");

/**
 * @load ./use-selected-records.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @param {Array<RecordJSON>} records     List of records on which you can perform `select` action
 * @return {UseSelectedRecordsResult}
 * @new In version 3.3
 * @bundle
 * @type {Function}
 */
function useSelectedRecords(records) {
  const [selectedRecords, setSelectedRecords] = (0, _react.useState)([]);

  const handleSelect = record => {
    const selectedIndex = selectedRecords.findIndex(selected => selected.id === record.id);

    if (selectedIndex < 0) {
      setSelectedRecords([...selectedRecords, record]);
    } else {
      const newSelectedRecords = [...selectedRecords];
      newSelectedRecords.splice(selectedIndex, 1);
      setSelectedRecords(newSelectedRecords);
    }
  };

  const handleSelectAll = () => {
    const missing = records.filter(record => !selectedRecords.find(selected => selected.id === record.id) && record.bulkActions.length);

    if (missing.length) {
      setSelectedRecords([...selectedRecords, ...missing]);
    } else {
      const newSelectedRecords = selectedRecords.filter(selected => !records.find(record => record.id === selected.id));
      setSelectedRecords(newSelectedRecords);
    }
  };

  return {
    handleSelect,
    handleSelectAll,
    selectedRecords,
    setSelectedRecords
  };
}