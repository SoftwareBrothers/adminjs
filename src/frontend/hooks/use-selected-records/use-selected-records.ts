import { useState } from 'react'

import { RecordJSON } from '../../interfaces/index.js'
import { UseSelectedRecordsResult } from './use-selected-records-result.type.js'

/**
 * @load ./use-selected-records.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @param {Array<RecordJSON>} records     List of records on which you can perform `select` action
 * @return {UseSelectedRecordsResult}
 * @bundle
 * @type {Function}
 */
function useSelectedRecords(records: Array<RecordJSON>): UseSelectedRecordsResult {
  const [selectedRecords, setSelectedRecords] = useState<Array<RecordJSON>>([])

  const handleSelect = (record: RecordJSON): void => {
    const selectedIndex = selectedRecords.findIndex((selected) => selected.id === record.id)
    if (selectedIndex < 0) {
      setSelectedRecords([...selectedRecords, record])
    } else {
      const newSelectedRecords = [...selectedRecords]
      newSelectedRecords.splice(selectedIndex, 1)
      setSelectedRecords(newSelectedRecords)
    }
  }

  const handleSelectAll = (): void => {
    const missing = records.filter((record) => (
      !selectedRecords.find((selected) => selected.id === record.id)
      && record.bulkActions.length
    ))
    if (missing.length) {
      setSelectedRecords([...selectedRecords, ...missing])
    } else {
      const newSelectedRecords = selectedRecords.filter((selected) => (
        !records.find((record) => record.id === selected.id)
      ))
      setSelectedRecords(newSelectedRecords)
    }
  }

  return {
    handleSelect,
    handleSelectAll,
    selectedRecords,
    setSelectedRecords,
  }
}

export {
  useSelectedRecords as default,
  useSelectedRecords,
}
