import React, { MouseEvent, SyntheticEvent, useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import {
  Box,
  H3,
  Button,
  Icon,
  Drawer,
  DrawerContent,
  DrawerFooter,
} from '@adminjs/design-system'

import PropertyType from '../property-type'
import { RecordJSON, ResourceJSON } from '../../interfaces'
import { useTranslation } from '../../hooks'
import allowOverride from '../../hoc/allow-override'

export type FilterProps = {
  resource: ResourceJSON;
  toggleFilter: () => void;
  isVisible: boolean;
}

type MatchProps = {
  resourceId: string;
}

const parseQuery = (location): any => {
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
  const { translateLabel, translateButton } = useTranslation()
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
      if (filter[key] !== '') {
        search.set(`filters.${key}`, filter[key])
      } else {
        search.delete(`filters.${key}`)
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

  return (
    <Drawer variant="filter" isHidden={!isVisible} as="form" onSubmit={handleSubmit}>
      <DrawerContent>
        <H3>
          <Button
            type="button"
            size="icon"
            rounded
            mr="lg"
            onClick={(): void => toggleFilter()}
          >
            <Icon icon="ChevronRight" color="white" />
          </Button>
          {translateLabel('filters', resource.id)}
        </H3>
        <Box my="x3">
          {properties.map((property) => (
            <PropertyType
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
      <DrawerFooter>
        <Button variant="primary" size="lg">
          {translateButton('applyChanges', resource.id)}
        </Button>
        <Button variant="text" size="lg" onClick={resetFilter} type="button" color="white">
          {translateButton('resetFilter', resource.id)}
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
