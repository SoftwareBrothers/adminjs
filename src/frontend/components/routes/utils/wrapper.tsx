import React from 'react'

import styled from 'styled-components'
import { Box, BoxProps, DrawerContent, DrawerFooter } from '@adminjs/design-system'

const StyledResourceActionWrapper = styled(Box)`
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

const StyledRecordActionWrapper = styled(Box)`
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

const Wrapper: React.FC<BoxProps & { actionType?: string }> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, variant, color, actionType = 'record', ...rest } = props

  const Component = actionType === 'record' ? StyledRecordActionWrapper : StyledResourceActionWrapper
  return (
    <Component {...rest} variant="grey" mx="auto">
      {children}
    </Component>
  )
}

export default Wrapper
