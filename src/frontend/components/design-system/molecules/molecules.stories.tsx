import React from 'react'
import { action } from '@storybook/addon-actions'

import { FormElements, FormElementsWithError } from './form-group.stories'
import { Box } from '../atoms/box'
import { H3, H5 } from '../atoms/header'
import { MessageBox } from './message-box'
import { DropZone } from './drop-zone/drop-zone'
import { Label } from '../atoms/label'

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
    <H5 mb="xl">Variants</H5>
    <MessageBox message="Some default message" onCloseClick={action('close clicked')} />
    <MessageBox message="Error message" mt="default" variant="danger" onCloseClick={action('close clicked')} />
    <MessageBox message="Info message" mt="default" variant="info" onCloseClick={action('close clicked')} />

    <H5 mt="xxl" mb="xl">With text</H5>
    <MessageBox message="Some default message" onCloseClick={action('close clicked')}>
      With inside text
    </MessageBox>
    <MessageBox message="Error message" mt="default" variant="danger" onCloseClick={action('close clicked')}>
      With inside text
    </MessageBox>
    <MessageBox message="Info message" mt="default" variant="info" onCloseClick={action('close clicked')}>
      With inside text
    </MessageBox>
    <H5 mt="xxl" mb="xl">Small</H5>
    <MessageBox
      size="sm"
      message="Info message"
      mt="default"
      variant="info"
      icon="AddComment"
      onCloseClick={action('close clicked')}
    >
      With inside text
    </MessageBox>
  </Box>
)

export const Upload = () => (
  <Box m="xxl">
    <H3 mb="xxl">DropZone</H3>
    <Box variant="grey">
      <Label required>Upload files</Label>
      <DropZone
        multiple
        validate={{ maxSize: 3291323, mimeTypes: ['image/png', 'image/gif'] }}
        onChange={action('on change')}
      />
    </Box>
  </Box>
)
