import React, { FC, useState, useEffect } from 'react'
import Select from 'react-select/lib/Async'
import { withTheme, DefaultTheme } from 'styled-components'

import ApiClient from '../../../utils/api-client'
import selectStyles from '../../../styles/select-styles'
import { EditPropertyProps, SelectRecord } from '../base-property-props'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import { FormGroup, Label, FormMessage } from '../../design-system'

type CombinedProps = EditPropertyProps & {theme: DefaultTheme}
type SelectRecordEnhanced = SelectRecord & {
  record: RecordJSON;
}

const Edit: FC<CombinedProps> = (props) => {
  const { onChange, property, record, theme } = props

  const handleChange = (selected: SelectRecordEnhanced): void => {
    if (selected) {
      onChange(property.name, selected.value, selected.record)
    } else {
      onChange(property.name, '')
    }
  }

  const loadOptions = async (inputValue: string): Promise<SelectRecordEnhanced[]> => {
    const api = new ApiClient()

    const records = await api.searchRecords({
      resourceId: property.reference as string,
      query: inputValue,
    })
    return records.map((r: RecordJSON) => ({
      value: r.id,
      label: r.title,
      record: r,
    }))
  }
  const error = record.errors && record.errors[property.name]

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        resourceId: property.reference!,
        recordId: selectedId,
      }).then(({ data }: any) => {
        setLoadedRecord(data.record)
      }).finally(() => {
        setLoadingRecord(c => c - 1)
      })
    }
  }, [selectedValue, selectedId, property.reference])

  return (
    <FormGroup error={!!error}>
      <Label htmlFor={property.name}>{property.label}</Label>
      <Select
        cacheOptions
        value={selectedOption}
        styles={styles}
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        isDisabled={property.isDisabled}
        isLoading={loadingRecord}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default withTheme(Edit)
