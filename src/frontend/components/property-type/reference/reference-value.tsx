import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonCSS } from '@admin-bro/design-system'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
}

const StyledLink = styled(Link)`
  ${ButtonCSS}
  padding-left: ${({ theme }): string => theme.space.xs};
  padding-right: ${({ theme }): string => theme.space.xs};
`

const ReferenceValue: React.FC<Props> = (props) => {
  const { property, record } = props

  const h = new ViewHelpers()
  const refId = record.params[property.name]
  const populated = record.populated[property.name]
  const value = (populated && populated.title) || refId

  if (!property.reference) {
    throw new Error(`property: "${property.name}" does not have a reference`)
  }

  if (populated && populated.recordActions.find(a => a.name === 'show')) {
    const href = h.recordActionUrl({
      resourceId: property.reference, recordId: refId, actionName: 'show',
    })
    return (
      <StyledLink variant="text" to={href}>{value}</StyledLink>
    )
  }
  return (
    <span>{value}</span>
  )
}

export default ReferenceValue
