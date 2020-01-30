import React from 'react'

import { FormGroup, InputGroup, FormMessage } from './form-group'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { Icon } from '../atoms/icon'
import { Box } from '../atoms/box'
import { DatePicker } from './date-picker'

export const FormGroupStory: React.FC<{error?: boolean}> = (props) => {
  const { error } = props
  return (
    <Box>
      <FormGroup error={error}>
        <Label required>Some form data</Label>
        <InputGroup>
          <Button variant="primary" size="icon">
            <Icon icon="ChevronRight" />
          </Button>
          <Input />
          <Label>100 KM</Label>
          <Button variant="primary" size="icon">
            <Icon icon="ChevronRight" />
          </Button>
        </InputGroup>
        <FormMessage>Some message</FormMessage>
      </FormGroup>
      <FormGroup error={error}>
        <Label>Some form data</Label>
        <InputGroup>
          <Input />
        </InputGroup>
        <FormMessage />
      </FormGroup>
      <FormGroup error={error}>
        <Label>Some form data</Label>
        <InputGroup />
      </FormGroup>
      <FormGroup error={error}>
        <Label>Some form data</Label>
        <InputGroup>
          <Input />
          <Button variant="text" size="icon"><Icon icon="View" /></Button>
        </InputGroup>
      </FormGroup>
    </Box>
  )
}

export const formGroupWithError: React.FC = () => (
  <FormGroupStory error />
)
