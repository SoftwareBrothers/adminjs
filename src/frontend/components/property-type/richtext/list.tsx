import truncate from 'lodash/truncate'
import React, { FC } from 'react'
import { ShowPropertyProps } from '../base-property-props'

const List: FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const maxLength = property.custom?.maxLength || 15
  const value: string = record.params[property.path] || ''
  const textValue = stripHtml(value)

  return <>{truncate(textValue, { length: maxLength, separator: ' ' })}</>
}

const stripHtml = (html: string): string => {
  let el = document.createElement('DIV')
  el.innerHTML = html
  return el.textContent || el.innerText || ''
}

export default List
