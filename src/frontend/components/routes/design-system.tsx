import React, { useState } from 'react'
import { withTheme, ThemeProps, DefaultTheme } from 'styled-components'
import { Add16 } from '@carbon/icons-react'

import {
  Button, Badge, CheckBox, Text,
  H1, H2, H3, H4, H5, H6,
  Label, Link, Input, TextArea, Radio,
  Box, DatePicker, Flex,
} from '../design-system'


import { Table, TableCell, TableRow, TableHead, TableBody } from '../design-system/table'

const mainColors: Array<'primary', 'danger', 'success', 'info', 'secondary'> = [
  'primary', 'danger', 'success', 'info', 'secondary']


const DesignSystem: React.FC<ThemeProps<DefaultTheme>> = ({ theme }) => {
  const [c2Checked, setC2Checked] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  return (
    <Box bg="transparent">
      <Box bg="white">
        <H3 mb={5}>Typography</H3>
        <Flex>
          <Box width={1 / 2} p={0}>
            <H1>H1 Header - 40</H1>
            <Text variant="sm" mb={5}>Roboto 40 - line height - 40</Text>
            <H2>H2 Header - 32</H2>
            <Text variant="sm" mb={5}>Roboto 32 - line height - 40</Text>
            <H3>H3 Header - 28</H3>
            <Text variant="sm" mb={5}>Roboto 28 - line height - 32</Text>
            <H4>H4 Header - 24</H4>
            <Text variant="sm" mb={5}>Roboto 24 - line height - 32</Text>
            <H5>H5 Header - 18</H5>
            <Text variant="sm" mb={5}>Roboto 18 - line height - 24</Text>
            <H6>H6 Header - 16</H6>
            <Text variant="sm" mb={5}>Roboto 16 - line height - 24</Text>
          </Box>
          <Box width={1 / 2} p={0}>
            <Text variant="sm" mb={5}>
              <p>This is small [variant=sm] text</p>
            </Text>
            <Text mb={5}>
              <p>This is regular text</p>
            </Text>
            <Text variant="lg" mb={5}>
              <p>This is a big [variant=lg] text</p>
            </Text>
            <Text variant="xs" mb={5}>
              <p>And there is also a super small [variant=xs] text</p>
            </Text>
          </Box>
        </Flex>
        <H3 my={5}>Colors</H3>
        <Text textAlign="center">
          <Flex>
            {mainColors.map(color => (
              <Box key={color}>
                <Box width="60px" height="60px" bg={color} />
                <Text variant="sm" color={color} mb={0}>{theme.colors[color]}</Text>
                <Text mt={0}>{color}</Text>
              </Box>
            ))}
          </Flex>
          <Flex>
            <Box>
              <Box width="60px" height="60px" bg="primaryHover" />
              <Text variant="sm" color="primaryHover" mb={0}>{theme.colors.primaryHover}</Text>
              <Text mt={0}>Primary Hover</Text>
            </Box>
          </Flex>
        </Text>

        <H3 mb={5}>Buttons</H3>
        <H4 mb={5}>Variants</H4>
        <p>
          <Button>Regular</Button>
          {mainColors.map(color => (
            <Button ml={3} variant={color}>{color}</Button>
          ))}
          <Button ml={3} variant="text">Text</Button>
        </p>
        <H4 my={5}>Sizes</H4>
        <p>
          <Button size="sm">Small</Button>
          <Button ml={3}>Regular size</Button>
          <Button size="lg" ml={3}>Large</Button>
        </p>
        <H4 my={5}>State</H4>
        <p>
          <Button disabled>Disabled</Button>
          <Button ml={3} variant="primary" disabled>Disabled</Button>
        </p>
        <H3 mb={5}>Badges</H3>
        <H4 my={5}>Variants</H4>
        <p>
          <Badge ml={3}>Default</Badge>
          {mainColors.map(color => (
            <Badge key={color} ml={3} variant={color}>{color}</Badge>
          ))}
        </p>
        <H4 my={5}>Outline</H4>
        <p>
          <Badge ml={3} outline>Default</Badge>
          {mainColors.map(color => (
            <Badge key={color} ml={3} variant={color} outline>{color}</Badge>
          ))}
        </p>
        <H4 my={5}>Sizes</H4>
        <p>
          <Badge ml={3} variant="primary" size="sm">small</Badge>
          <Badge ml={3} variant="primary">regular</Badge>
          <Badge ml={3} variant="primary" size="lg">large</Badge>
        </p>
        <p>
          <Label>This is a label</Label>
          <Input name="example1" />
        </p>
        <p>
          <Label variant="required">This is a Required Text Area</Label>
          <TextArea name="example2" />
        </p>
        <p>
          <CheckBox id="example3" />
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
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
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
              <TableCell><CheckBox /></TableCell>
              <TableCell>
                <Link uppercase href="/#">
                  Name
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
              <TableCell><CheckBox /></TableCell>
              <TableCell>Value 1</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
              <TableCell>Value 2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><CheckBox /></TableCell>
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

export default withTheme(DesignSystem)
