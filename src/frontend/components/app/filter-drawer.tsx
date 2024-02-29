import { Box, Button, Drawer, DrawerContent, DrawerFooter, H3, Icon } from '@adminjs/design-system'
import isNil from 'lodash/isNil.js'
import pickBy from 'lodash/pickBy.js'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import allowOverride from '../../hoc/allow-override.js'
import { useTranslation } from '../../hooks/index.js'
import { useFilterDrawer } from '../../hooks/use-filter-drawer.js'
import { useQueryParams } from '../../hooks/use-query-params.js'
import { RecordJSON, ResourceJSON } from '../../interfaces/index.js'
import { getResourceElementCss } from '../../utils/index.js'
import BasePropertyComponent from '../property-type/index.js'

export type FilterProps = {
  resource: ResourceJSON
}

type MatchProps = {
  resourceId: string
}

const FilterDrawer: React.FC<FilterProps> = (props) => {
  const { resource } = props
  const properties = resource.filterProperties

  const [filter, setFilter] = useState<Record<string, unknown>>({})
  const params = useParams<MatchProps>()
  const { translateButton, translateLabel } = useTranslation()
  const initialLoad = useRef(true)
  const { isVisible, toggleFilter } = useFilterDrawer()
  const { storeParams, clearParams, filters } = useQueryParams()

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
    } else {
      setFilter({})
    }
  }, [params.resourceId])

  const handleSubmit: FormEventHandler<HTMLElement> = (event) => {
    event.preventDefault()
    storeParams({ filters: pickBy(filter, (v) => !isNil(v)), page: '1' })
  }

  const handleReset: FormEventHandler<HTMLElement> = (event) => {
    event.preventDefault()
    clearParams('filters')
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
      [propertyName as string]: typeof value === 'string' && !value.length ? undefined : value,
    })
  }

  const contentTag = getResourceElementCss(resource.id, 'filter-drawer')
  const cssContent = getResourceElementCss(resource.id, 'filter-drawer-content')
  const cssFooter = getResourceElementCss(resource.id, 'filter-drawer-footer')
  const cssButtonApply = getResourceElementCss(resource.id, 'filter-drawer-button-apply')
  const cssButtonReset = getResourceElementCss(resource.id, 'filter-drawer-button-reset')

  return (
    <Drawer
      variant="filter"
      isHidden={!isVisible}
      as="form"
      onSubmit={handleSubmit}
      onReset={handleReset}
      data-css={contentTag}
    >
      <DrawerContent data-css={cssContent}>
        <Box flex justifyContent="space-between">
          <H3>{translateLabel('filters', resource.id)}</H3>
          <Button
            type="button"
            variant="light"
            size="icon"
            rounded
            color="text"
            onClick={toggleFilter}
          >
            <Icon icon="X" />
          </Button>
        </Box>
        <Box my="x3">
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
      </DrawerContent>
      <DrawerFooter data-css={cssFooter}>
        <Button type="button" variant="light" onClick={handleReset} data-css={cssButtonReset}>
          {translateButton('resetFilter', resource.id)}
        </Button>
        <Button type="submit" variant="contained" data-css={cssButtonApply}>
          {translateButton('applyChanges', resource.id)}
        </Button>
      </DrawerFooter>
    </Drawer>
  )
}

const OverridableFilterDrawer = allowOverride(FilterDrawer, 'FilterDrawer')

export {
  OverridableFilterDrawer as default,
  OverridableFilterDrawer as FilterDrawer,
  FilterDrawer as OriginalFilterDrawer,
}
