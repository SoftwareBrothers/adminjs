import { Box } from '@adminjs/design-system'
import truncate from 'lodash/truncate'
import React, { FC, useEffect, useRef } from 'react'
import { ShowPropertyProps } from '../base-property-props'

const MAX_LENGTH = 15

const List: FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const value: string = record.params[property.path] || ''
  const contentRef = useRef<HTMLDivElement>(null)
  const regex = /(<([^>]+)>)/gi
  const result = value.replace(regex, '')

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = truncate(result, { length: MAX_LENGTH, separator: ' ' })
    }
  }, [])

  return <Box ref={contentRef} />
}

export default List
