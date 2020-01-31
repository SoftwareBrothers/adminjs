import React from 'react'

import { FormElements, FormElementsWithError } from './form-group.stories'
import { Box } from '../atoms/box'
import { H3 } from '../atoms/header'

export default {
  title: 'Molecules',
}

export const Form = () => (
  <Box m="xxl">
    <H3 mb="xxl">All types of inputs</H3>
    <FormElements />
  </Box>
)

export const FormWithError = () => (
  <Box m="xxl">
    <H3 mb="xxl">With errors</H3>
    <FormElementsWithError />
  </Box>
)

export const Messages = () => (
  <Box m="xxl">
    <H3 mb="xxl">Messages</H3>
    <Box />
  </Box>
)
