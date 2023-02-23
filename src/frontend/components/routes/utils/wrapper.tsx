import React from 'react'
import { Box, BoxProps, DrawerContent, DrawerFooter } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override.js'
import styled from '../../../utils/styled-components.js'

const StyledWrapperWithFilter = styled(Box)`
  & > ${DrawerContent} {
    background: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.space.xxl};
    overflow: visible;
  }

  & > ${DrawerFooter} {
    background: ${({ theme }) => theme.colors.white};
    padding: 0 ${({ theme }) => theme.space.xxl} ${({ theme }) => theme.space.xxl};
  }
`

const StyledWrapper = styled(Box)`
  & ${DrawerContent} {
    background: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.space.xxl};
    overflow: visible;
  }

  & ${DrawerFooter} {
    background: ${({ theme }) => theme.colors.white};
    padding: 0 ${({ theme }) => theme.space.xxl} ${({ theme }) => theme.space.xxl};
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
    <Component {...rest} variant="grey" mx="auto" data-css="styled-wrapper">
      {children}
    </Component>
  )
}

export default allowOverride(Wrapper, 'RouteWrapper')
