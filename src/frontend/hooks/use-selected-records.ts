import { useState } from 'react'
import RecordJSON from '../../backend/decorators/record-json.interface'

export type UseSelectedRecordsResult = {
  selectedRecords: Array<RecordJSON>;
  setSelectedRecords: any;
  handleSelect: (record: RecordJSON) => void;
  handleSelectAll: () => void;
}

export const useSelectedRecords = (records: Array<RecordJSON>): UseSelectedRecordsResult => {
  const [selectedRecords, setSelectedRecords] = useState<Array<RecordJSON>>([])

  const handleSelect = (record: RecordJSON): void => {
    const selectedIndex = selectedRecords.findIndex(selected => selected.id === record.id)
    if (selectedIndex < 0) {
      setSelectedRecords([...selectedRecords, record])
    } else {
      const newSelectedRecords = [...selectedRecords]
      newSelectedRecords.splice(selectedIndex, 1)
      setSelectedRecords(newSelectedRecords)
    }
  }

  const handleSelectAll = (): void => {
    const missing = records.filter(record => (
      !selectedRecords.find(selected => selected.id === record.id)
      && record.bulkActions.length
    ))
    if (missing.length) {
      setSelectedRecords([...selectedRecords, ...missing])
    } else {
      const newSelectedRecords = selectedRecords.filter(selected => (
        !records.find(record => record.id === selected.id)
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

export default useSelectedRecords
