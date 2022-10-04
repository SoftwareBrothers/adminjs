import React, { useState } from 'react'
import { FormGroup, Label, SelectAsync } from '@adminjs/design-system'

import ApiClient from '../../../utils/api-client'
import { FilterPropertyProps, SelectRecord } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'

type SelectOptions = Array<{value: string | number; label: string }>

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, filter, onChange } = props
  const [options, setOptions] = useState<SelectOptions>([])

  const api = new ApiClient()

  const handleChange = (selected: SelectRecord) => {
    onChange(property.path, selected ? selected.value : '')
  }

  const loadOptions = async (inputValue: string): Promise<SelectOptions> => {
    const records = await api.searchRecords({
      resourceId: property.reference as string,
      query: inputValue,
    })

    const loadedOptions = records.map((r) => ({ value: r.id, label: r.title }))
    setOptions(loadedOptions)

    return loadedOptions
  }

  const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path]
  const selected = (options || []).find((o) => String(o.value) === String(value))

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <SelectAsync
        variant="filter"
        value={typeof selected === 'undefined' ? '' : selected}
        isClearable
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        defaultOptions
      />
    </FormGroup>
  )
}

export default allowOverride(Filter, 'DefaultReferenceFilterProperty')
