import { Box, Button, DEFAULT_DRAWER_WIDTH, H3, Icon } from '@adminjs/design-system'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from '../../hooks/use-translation.js'
import { RecordJSON, ResourceJSON } from '../../interfaces/index.js'
import BasePropertyComponent from '../property-type/index.js'
import { useQueryListParams } from '../../hooks/use-query-list-params.js'
import { useFilterDrawer } from '../../hooks/use-filter-drawer.js'

export type FilterForm = {
  resource: ResourceJSON
}

export const FilterForm: FC<FilterForm> = (props) => {
  const { resource } = props
  const [filter, setFilter] = useState<any>({})
  const properties = resource.filterProperties
  const { tb, tl } = useTranslation()
  const { storeParams, filters, showFilters } = useQueryListParams()
  const { toggleFilter } = useFilterDrawer()

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    storeParams({ filters: filter })
  }

  const handleReset = (event: SubmitEvent) => {
    event.preventDefault()
    storeParams({ filters: undefined })
    setFilter({})
  }

  useEffect(() => {
    if (filters) {
      setFilter(filters)
    }
  }, [filters])

  const handleChange = (propertyName: string | RecordJSON, value: any): void => {
    if ((propertyName as RecordJSON).params) {
      throw new Error('you can not pass RecordJSON to filters')
    }
    setFilter({
      ...filter,
      [propertyName as string]: value,
    })
  }

  // if (!showFilters) return null

  return (
    <Box
      flex
      flexDirection="column"
      p="xl"
      bg="container"
      borderRadius={8}
      height="100%"
      width={DEFAULT_DRAWER_WIDTH}
    >
      <H3>{tl('filters', resource.id)}</H3>
      <Box
        as="form"
        onSubmit={handleSubmit}
        onReset={handleReset}

      >
        <Box as="div">
          {properties.map((property) => (
            <BasePropertyComponent
              key={property.propertyPath}
              where="filter"
              onChange={handleChange}
              property={property}
              filter={filter}
              resource={resource}
            />
          ))}
        </Box>
        <Box flex mt="auto" style={{ gap: 16 }}>
          <Button type="reset" variant="light">
            {tb('resetFilter', resource.id)}
          </Button>
          <Button type="submit" variant="contained">
            {tb('applyChanges', resource.id)}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
