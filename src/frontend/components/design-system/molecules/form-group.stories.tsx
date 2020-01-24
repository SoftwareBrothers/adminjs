import React from 'react'

import { FormGroup, InputGroup, FormMessage } from './form-group'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Flex } from '../atoms/flex'
import { Button } from '../atoms/button'
import { Icon } from '../atoms/icon'
import { Box } from '../atoms/box'
import { DatePicker } from './date-picker'
import { Link } from '../atoms/link'

export default {
  title: 'FormGroup',
}

export const formGroup: React.FC = () => (
  <Box width={1}>
    <FormGroup>
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
    <FormGroup>
      <Label>Some form data</Label>
      <InputGroup>
        <Input />
      </InputGroup>
      <FormMessage />
    </FormGroup>
    <FormGroup>
      <Label>Some form data</Label>
      <InputGroup>
        <DatePicker />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Label>Some form data</Label>
      <InputGroup>
        <Input />
        <Button variant="text" size="icon"><Icon icon="View" /></Button>
      </InputGroup>
    </FormGroup>
  </Box>
)

export const formGroupWithError: React.FC = () => (
  <FormGroup error>
    <Label required>Some form data</Label>
    <InputGroup>
      <Input />
      <Label>100 KM</Label>
    </InputGroup>
    <FormMessage>Some message</FormMessage>
  </FormGroup>
)
