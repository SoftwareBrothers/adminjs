import {
  Box, Button, Drawer,
  DrawerContent,
  DrawerFooter, H3, Icon,
} from '@adminjs/design-system'
import React, { MouseEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import omit from 'lodash/omit.js'

import allowOverride from '../../hoc/allow-override.js'
import { useTranslation } from '../../hooks/index.js'
import { RecordJSON, ResourceJSON } from '../../interfaces/index.js'
import { getResourceElementCss } from '../../utils/index.js'
import BasePropertyComponent from '../property-type/index.js'

export type FilterProps = {
  resource: ResourceJSON;
  toggleFilter: () => void;
  isVisible: boolean;
}

type MatchProps = {
  resourceId: string;
}

const parseQuery = (location): Record<string, string> => {
  const filter: Record<string, string> = {}
  const query = new URLSearchParams(location.search)
  for (const entry of query.entries()) {
    const [key, value] = entry
    if (key.match('filters.')) {
      filter[key.replace('filters.', '')] = value
    }
  }
  return filter
}

const FilterDrawer: React.FC<FilterProps> = (props) => {
  const { resource, isVisible, toggleFilter } = props
  const properties = resource.filterProperties

  const location = useLocation()
  const [filter, setFilter] = useState(parseQuery(location))
  const params = useParams<MatchProps>()
  const navigate = useNavigate()
  const { translateButton, translateLabel } = useTranslation()
  const initialLoad = useRef(true)

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
    } else {
      setFilter({})
    }
  }, [params.resourceId])

  const handleSubmit = (event: SyntheticEvent): false => {
    event.preventDefault()
    const search = new URLSearchParams(window.location.search)

    Object.keys(filter).forEach((key) => {
      if (filter[key] === undefined || filter[key] === '') {
        search.delete(`filters.${key}`)
      } else {
        search.set(`filters.${key}`, filter[key])
      }
    })

    toggleFilter()
    search.set('page', '1')
    navigate(`${location.pathname}?${search.toString()}`)
    return false
  }

  const resetFilter = (event: MouseEvent): void => {
    event.preventDefault()
    const filteredSearch = new URLSearchParams()
    const search = new URLSearchParams(window.location.search)
    for (const key of search.keys()) {
      if (!key.match('filters.')) {
        filteredSearch.set(key, search.get(key) as string)
      }
    }
    const query = filteredSearch.toString() === '' ? `?${filteredSearch.toString()}` : ''
    toggleFilter()
    navigate(location.pathname + query)
    setFilter({})
  }

  const handleChange = (propertyName: string | RecordJSON, value: any): void => {
    if ((propertyName as RecordJSON).params) {
      throw new Error('you can not pass RecordJSON to filters')
    }
    setFilter({
      ...filter,
      [propertyName as string]: value,
    })
  }

  const contentTag = getResourceElementCss(params.resourceId!, 'filter-drawer')
  const cssContent = getResourceElementCss(params.resourceId!, 'filter-drawer-content')
  const cssFooter = getResourceElementCss(params.resourceId!, 'filter-drawer-footer')
  const cssButtonApply = getResourceElementCss(params.resourceId!, 'filter-drawer-button-apply')
  const cssButtonReset = getResourceElementCss(params.resourceId!, 'filter-drawer-button-reset')

  return (
    <Drawer variant="filter" isHidden={!isVisible} as="form" onSubmit={handleSubmit} data-css={contentTag}>
      <DrawerContent data-css={cssContent}>
        <Box flex justifyContent="space-between">
          <H3>{translateLabel('filters', resource.id)}</H3>
          <Button
            type="button"
            variant="light"
            size="icon"
            rounded
            color="text"
            onClick={(): void => toggleFilter()}
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
        <Button type="button" size="lg" variant="light" onClick={resetFilter} data-css={cssButtonReset}>
          {translateButton('resetFilter', resource.id)}
        </Button>
        <Button type="submit" variant="contained" size="lg" data-css={cssButtonApply}>
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
}
