import React from 'react'
import styled from 'styled-components'

import * as icons from './icons'

type Props = {
  variant: 'Filter';
}

const StyledIcon = styled.svg`
  width: 12px;
  height: 12px;
  fill: ${({ theme }) => theme.colors.textDefault};
`

const Icon: React.FC<Props> = (props) => {
  const { variant, ...otherProps } = props
  const Component = icons[variant]
  return (
    <StyledIcon viewBox="0 0 512 512" {...otherProps}>
      <Component />
    </StyledIcon>
  )
}

export default styled(Icon)``
