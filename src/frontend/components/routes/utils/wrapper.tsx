import React, { ComponentType, PropsWithChildren } from 'react'
import { Box, BoxProps, Drawer, DrawerContent, DrawerFooter } from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'

import allowOverride from '../../../hoc/allow-override.js'

const StyledWrapperWithFilter = styled(Box)`
  & > ${Drawer} {
    border-radius: ${({ theme }) => theme.space.sm};
  }

  & > ${DrawerContent} {
    background: ${({ theme }) => theme.colors.container};
    padding: ${({ theme }) => theme.space.xxl};
    overflow: visible;
  }

  & > ${DrawerFooter} {
    background: ${({ theme }) => theme.colors.container};
    padding: 0 ${({ theme }) => theme.space.xxl} ${({ theme }) => theme.space.xxl};
  }
`

const StyledWrapper = styled(Box)`
  & ${DrawerContent} {
    background: ${({ theme }) => theme.colors.container};
    padding: ${({ theme }) => theme.space.xxl};
    overflow: visible;
  }

  & ${DrawerFooter} {
    background: ${({ theme }) => theme.colors.container};
    padding: 0 ${({ theme }) => theme.space.xxl} ${({ theme }) => theme.space.xxl};
  }
`

type WrapperProps = BoxProps & {
  showFilter?: boolean;
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, variant, color, showFilter = false, 'data-css': dataCss, ...rest } = props

  const Component: ComponentType<PropsWithChildren<any>> = showFilter
    ? StyledWrapperWithFilter
    : StyledWrapper

  return (
    <Component {...rest} variant="transparent" mx="auto" data-css={dataCss || 'styled-wrapper'}>
      {children}
    </Component>
  )
}

export default allowOverride(Wrapper, 'RouteWrapper')
