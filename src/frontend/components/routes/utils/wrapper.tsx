import React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, DrawerContent, DrawerFooter } from '../../design-system'

const StyledWrapper = styled(Box)`
  & ${DrawerContent} {
    background: ${({ theme }): string => theme.colors.white};
    padding: ${({ theme }): string => theme.space.xxl};
  }
  
  & ${DrawerFooter} {
    background: ${({ theme }): string => theme.colors.white};
    padding: 0 ${({ theme }): string => theme.space.xxl} ${({ theme }): string => theme.space.xxl};
  }
`

StyledWrapper.defaultProps = {
  // width: [1, 1, 1, 1024],
  // m: '0 auto',
}

const Wrapper: React.FC<BoxProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, variant, color, ...rest } = props
  return (
    <StyledWrapper {...rest} variant="grey">
      {children}
    </StyledWrapper>
  )
}

export default Wrapper
