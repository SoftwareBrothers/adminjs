import React, { FC, useEffect, useRef } from 'react'
import { ShowPropertyProps } from '../base-property-props'

const List: FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const value = record.params[property.path] || ''
  const container = useRef<HTMLDivElement>(null)
  const regex = /(<([^>]+)>)/gi
  const result = value.replace(regex, '')

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = result
    }
  }, [])

  return <div ref={container} />
}

export default List
