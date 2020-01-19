import React, { useState } from 'react'

import { IoMdArrowDropdown, IoIosArrowForward } from 'react-icons/io'

import Button from '../design-system/button'
import Link from '../design-system/link'
import Label from '../design-system/label'
import Input from '../design-system/input'
import TextArea from '../design-system/text-area'
import Checkbox from '../design-system/check-box'
import Radio from '../design-system/radio'
import Badge from '../design-system/badge'
import Icon from '../design-system/icon'
import Box from '../design-system/box'
import * as Header from '../design-system/header'
import { Table, TableCell, TableRow, TableHead, TableBody } from '../design-system/table'


const DesignSystem: React.FC = () => {
  const [c2Checked, setC2Checked] = useState(false)
  return (
    <Box bg="transparent">
      <Box bg="white">
        <Header.H3>Typography</Header.H3>
        <Header.H1>This is header 1</Header.H1>
        <Header.H2>This is header 2</Header.H2>
        <Header.H3>This is header 3</Header.H3>
        <Header.H4>This is header 4</Header.H4>
        <Header.H5>This is header 5</Header.H5>

        <h3 style={{ marginTop: 100 }}>Buttons</h3>
        <p>
          <Button>Regular button</Button>
          <Button ml={3} variant="primary">Primary</Button>
          <Button ml={3} variant="danger">Danger</Button>
          <Button ml={3} variant="primary">
            <Icon variant="Filter" />
            Filter Icon
          </Button>
          <Button ml={3} variant="text" as="a">Text Link</Button>
          <Button ml={3}>
            <IoIosArrowForward />
          </Button>
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
          <Checkbox id="example3" />
          <Label htmlFor="example3" variant="required" display="inline" ml="2">This is a checkbox</Label>
        </p>
        <p>
          <Radio
            id="example4"
            checked={c2Checked}
            onChange={(): void => { setC2Checked(!c2Checked) }}
          />
          <Label htmlFor="example4" variant="required" display="inline" ml="2">This is a radio</Label>
        </p>
        <h3>Badges</h3>
        <p>
          <Badge>default badge</Badge>
          <Badge ml={3} variant="primary">primary badge</Badge>
          <Badge ml={3} variant="danger">danger badge</Badge>
        </p>
        <h3>Table</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              <TableCell>
                <Link uppercase href="/#">
                  Name
                  <IoMdArrowDropdown />
                </Link>
              </TableCell>
              <TableCell>column 2</TableCell>
              <TableCell>column 3</TableCell>
              <TableCell>column 4</TableCell>
              <TableCell>column 5</TableCell>
              <TableCell>column 6</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              <TableCell>Value 1</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              <TableCell>Value 1</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}

export default DesignSystem
