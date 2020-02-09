import React, { useState } from 'react'

import { FormGroup, InputGroup, FormMessage } from './form-group'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { Icon } from '../atoms/icon'
import { Box } from '../atoms/box'
import { DatePicker } from './date-picker'
import { Link } from '../atoms/link'
import { CheckBox } from '../atoms/check-box'
import { Text } from '../atoms/text'
import { Radio } from '../atoms/radio'
import { DropZone } from './drop-zone/drop-zone'

export const FormElements: React.FC<{error?: boolean}> = (props) => {
  const { error } = props
  const [date, setDate] = useState('1984-03-02')
  return (
    <Box>
      <FormGroup error={error}>
        <Label required>Example required input with all sorts of buttons</Label>
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
        <FormMessage>And the optional message</FormMessage>
      </FormGroup>
      <FormGroup error={error}>
        <Label>There is also not required filed with just a text</Label>
        <InputGroup>
          <Input />
        </InputGroup>
        <FormMessage />
      </FormGroup>
      <FormGroup error={error} disabled>
        <Label>Disabled field</Label>
        <InputGroup>
          <Input disabled />
        </InputGroup>
        <FormMessage />
      </FormGroup>
      <FormGroup error={error}>
        <Label>Some date picker</Label>
        <DatePicker onChange={setDate} value={date} />
        <FormMessage />
      </FormGroup>
      <FormGroup error={error}>
        <Label>Some form data with button link</Label>
        <InputGroup>
          <Input />
          <Link href="#someHref">This is link</Link>
        </InputGroup>
        <FormMessage />
      </FormGroup>
      <FormGroup error={error}>
        <Label>Pick the right color with check box</Label>
        <Text>
          <CheckBox id="check" />
          <Label inline htmlFor="check">And check box</Label>
        </Text>
        <Text>
          <CheckBox disabled id="check2" checked />
          <Label inline disabled htmlFor="check2">check box disabled</Label>
        </Text>
        <FormMessage />
      </FormGroup>
      <FormGroup error={error}>
        <Label>WIth radio</Label>
        <Text>
          <Radio id="radio" />
          <Label inline htmlFor="radio">And radio</Label>
        </Text>
        <Text>
          <Radio disabled id="radio2" checked />
          <Label inline disabled htmlFor="radio2">radio disabled</Label>
        </Text>
        <FormMessage />
      </FormGroup>
      <FormGroup error={error}>
        <Label>And upload form</Label>
        <DropZone />
        <FormMessage />
      </FormGroup>
    </Box>
  )
}

export const FormElementsWithError: React.FC = () => (
  <FormElements error />
)
