import { Box, Loader } from '@adminjs/design-system'
import React, { FC } from 'react'

export const AppLoader: FC = () => (
  <Box width="100%" height="100%" flex alignItems="center" justifyContent="center">
    <Loader />
  </Box>
)
