import React from 'react'
import styled from 'styled-components/dist/styled-components.esm.js'
import { Link } from 'react-router-dom'
import { ButtonCSS } from '@adminjs/design-system'

import ViewHelpers from '../../../../backend/utils/view-helpers/view-helpers.js'
import allowOverride from '../../../hoc/allow-override.js'
import { ShowPropertyProps } from '../base-property-props.js'

const StyledLink = styled<any>(Link)`
  ${ButtonCSS};
  padding-left: ${({ theme }) => theme.space.xs};
  padding-right: ${({ theme }) => theme.space.xs};
`

type Props = Pick<ShowPropertyProps, 'property' | 'record'>

const ReferenceValue: React.FC<Props> = (props) => {
  const { property, record } = props

  const h = new ViewHelpers()
  const refId = record.params[property.path]
  const populated = record.populated[property.path]
  const value = (populated && populated.title) || refId

  if (!property.reference) {
    throw new Error(`property: "${property.path}" does not have a reference`)
  }

  if (populated && populated.recordActions.find((a) => a.name === 'show')) {
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

export default allowOverride(ReferenceValue, 'DefaultReferenceValue')
