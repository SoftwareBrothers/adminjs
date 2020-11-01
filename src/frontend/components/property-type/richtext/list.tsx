import React from 'react'
import { ShowPropertyProps } from '../base-property-props'

const List: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const original = record.params[property.path] || ''
  const value = original.substring(0, 15) + (original.length > 15 ? '...' : '')

  return (
    <span>{value}</span>
  )
}

export default List
