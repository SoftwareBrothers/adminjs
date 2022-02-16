import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select/async'
import { DefaultTheme, withTheme } from 'styled-components'
import { FormGroup, Label, filterStyles } from '@adminjs/design-system'
import { useSelector } from 'react-redux'
import { RecordJSON, ReduxState } from 'src'
import ApiClient from '../../../utils/api-client'
import { FilterPropertyProps, SelectRecord } from '../base-property-props'

type CombinedProps = FilterPropertyProps & { theme: DefaultTheme }
type SelectRecordEnhanced = SelectRecord & {
  record: RecordJSON;
}

const Filter: FC<CombinedProps> = (props) => {
  const { onChange, property, record, theme } = props
  const { reference: resourceId } = property
  const [filterUser] = useSelector((state: ReduxState) => [state.filterUser])

  if (!resourceId) {
    throw new Error(`Cannot reference resource in property '${property.path}'`)
  }
  const handleChange = (selected: SelectRecordEnhanced): void => {
    if (selected) {
      onChange(property.path, selected.value, selected.record)
    } else {
      onChange(property.path, null)
    }
  }
  const loadOptions = async (): Promise<SelectRecordEnhanced[]> => {
    const api = new ApiClient()

    const optionRecords = await api.searchRecords({
      resourceId,
      query: filterUser,
    })
    return optionRecords.map((optionRecord: RecordJSON) => ({
      value: optionRecord.id,
      label: optionRecord.title,
      record: optionRecord,
    }))
  }

  const selectedId = record?.params[property.path] as string | undefined
  const [loadedRecord, setLoadedRecord] = useState<RecordJSON | undefined>()
  const [, setLoadingRecord] = useState(0)
  const selectedValue = record?.populated[property.path] ?? loadedRecord
  const selectedOption = selectedId && selectedValue
    ? {
      value: selectedValue.id,
      label: selectedValue.title,
    }
    : {
      value: '',
      label: '',
    }

  useEffect(() => {
    if (!selectedValue && selectedId) {
      setLoadingRecord(c => c + 1)
      const api = new ApiClient()
      api
        .recordAction({
          actionName: 'show',
          resourceId,
          recordId: selectedId,
        })
        .then(({ data }: any) => {
          setLoadedRecord(data.record)
        })
        .finally(() => {
          setLoadingRecord(c => c - 1)
        })
    }
  }, [selectedValue, selectedId, resourceId])

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <Select
        value={selectedOption}
        isClearable
        cacheOptions
        styles={filterStyles(theme)}
        loadOptions={loadOptions}
        onChange={handleChange}
        defaultOptions
      />
    </FormGroup>
  )
}

export default withTheme(Filter)
