import React, { FC, useState, useEffect } from 'react'
import Select from 'react-select/lib/Async'
import { withTheme, DefaultTheme } from 'styled-components'
import { FormGroup, Label, FormMessage, selectStyles } from '@admin-bro/design-system'

import ApiClient from '../../../utils/api-client'
import { EditPropertyProps, SelectRecord } from '../base-property-props'
import RecordJSON from '../../../../backend/decorators/record-json.interface'

type CombinedProps = EditPropertyProps & {theme: DefaultTheme}
type SelectRecordEnhanced = SelectRecord & {
  record: RecordJSON;
}

const Edit: FC<CombinedProps> = (props) => {
  const { onChange, property, record, theme } = props
  const { reference: resourceId } = property

  if (!resourceId) {
    throw new Error(`Cannot reference resource in property '${property.name}'`)
  }

  const handleChange = (selected: SelectRecordEnhanced): void => {
    if (selected) {
      onChange(property.name, selected.value, selected.record)
    } else {
      onChange(property.name, null)
    }
  }

  const loadOptions = async (inputValue: string): Promise<SelectRecordEnhanced[]> => {
    const api = new ApiClient()

    const optionRecords = await api.searchRecords({
      resourceId,
      query: inputValue,
    })
    return optionRecords.map((optionRecord: RecordJSON) => ({
      value: optionRecord.id,
      label: optionRecord.title,
      record: optionRecord,
    }))
  }
  const error = record?.errors[property.name]

  const selectedId = record?.params[property.name] as string | undefined
  const [loadedRecord, setLoadedRecord] = useState<RecordJSON | undefined>()
  const [loadingRecord, setLoadingRecord] = useState(0)
  const selectedValue = record?.populated[property.name] ?? loadedRecord
  const selectedOption = (selectedId && selectedValue) ? {
    value: selectedValue.id,
    label: selectedValue.title,
  } : {
    value: '',
    label: '',
  }
  const styles = selectStyles(theme)

  useEffect(() => {
    if (!selectedValue && selectedId) {
      setLoadingRecord(c => c + 1)
      const api = new ApiClient()
      api.recordAction({
        actionName: 'show',
        resourceId,
        recordId: selectedId,
      }).then(({ data }: any) => {
        setLoadedRecord(data.record)
      }).finally(() => {
        setLoadingRecord(c => c - 1)
      })
    }
  }, [selectedValue, selectedId, resourceId])

  return (
    <FormGroup error={Boolean(error)}>
      <Label
        htmlFor={property.name}
        required={property.isRequired}
      >
        {property.label}
      </Label>
      <Select
        cacheOptions
        value={selectedOption}
        styles={styles}
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        isClearable
        isDisabled={property.isDisabled}
        isLoading={loadingRecord}
      />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

export default withTheme(Edit)
