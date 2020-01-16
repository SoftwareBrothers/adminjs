import React, { useState } from 'react'

import Button from '../design-system/button'
import WrapperBox from '../ui/wrapper-box'
import Label from '../design-system/label'
import Input from '../design-system/input'
import TextArea from '../design-system/text-area'
import Checkbox from '../design-system/check-box'
import Badge from '../design-system/badge'

const DesignSystem: React.FC = () => {
  const [c1Checked, setC1Checked] = useState(false)
  return (
    <WrapperBox>
      <WrapperBox border>
        <h3 style={{ marginTop: 100 }}>Buttons</h3>
        <p>
          <Button>Regular button</Button>
          <Button ml={3} variant="primary">Primary</Button>
          <Button ml={3} variant="danger">Danger</Button>
          <Button ml={3} variant="text" as="a">Text Link</Button>
        </p>
        <p>
          <Button size="sm">Small</Button>
          <Button ml={3}>Regular size</Button>
          <Button size="lg" ml={3}>Large</Button>
        </p>
        <h3>Inputs</h3>
        <p>
          <Label>This is a label</Label>
          <Input name="example1" />
        </p>
        <p>
          <Label variant="required">This is a Required Text Area</Label>
          <TextArea name="example2" />
        </p>
        <p>
          <Checkbox
            id="example3"
            checked={c1Checked}
            onChange={(): void => { setC1Checked(!c1Checked); console.log(c1Checked) }}
          />
          <Label htmlFor="example3" variant="required" display="inline" ml="2">This is a checkbox</Label>
        </p>
        <h3>Badges</h3>
        <p>
          <Badge>default badge</Badge>
          <Badge ml={3} variant="primary">primary badge</Badge>
          <Badge ml={3} variant="danger">danger badge</Badge>
        </p>
      </WrapperBox>
    </WrapperBox>
  )
}

export default DesignSystem
