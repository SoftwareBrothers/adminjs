import React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, DrawerContent, DrawerFooter } from '@adminjs/design-system'

const StyledWrapperWithFilter = styled(Box)`
  & > ${DrawerContent} {
    background: ${({ theme }): string => theme.colors.white};
    padding: ${({ theme }): string => theme.space.xxl};
    overflow: visible;
  }

  & > ${DrawerFooter} {
    background: ${({ theme }): string => theme.colors.white};
    padding: 0 ${({ theme }): string => theme.space.xxl} ${({ theme }): string => theme.space.xxl};
  }
`

const StyledWrapper = styled(Box)`
  & ${DrawerContent} {
    background: ${({ theme }): string => theme.colors.white};
    padding: ${({ theme }): string => theme.space.xxl};
    overflow: visible;
  }

  & ${DrawerFooter} {
    background: ${({ theme }): string => theme.colors.white};
    padding: 0 ${({ theme }): string => theme.space.xxl} ${({ theme }): string => theme.space.xxl};
  }
`

type WrapperProps = BoxProps & {
  showFilter?: boolean;
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, variant, color, showFilter = false, ...rest } = props

  const Component = showFilter ? StyledWrapperWithFilter : StyledWrapper
  return (
    <Component {...rest} variant="grey" mx="auto">
      {children}
    </Component>
  )
}

export default Wrapper
