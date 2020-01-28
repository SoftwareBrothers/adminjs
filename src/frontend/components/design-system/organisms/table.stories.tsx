import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, TableCaption } from '../atoms/table'
import { CheckBox } from '../atoms/check-box'
import { Link } from '../atoms/link'
import { DropDownStory } from './drop-down.stories'
import { Icon } from '../atoms/icon'

// eslint-disable-next-line import/prefer-default-export
export const TableStory = () => (
  <Table>
    <TableCaption>
      Monthly savings
      <Link href="/#" variant="primary" ml={6}>
        <Icon icon="Delete" />
        Remove
      </Link>
    </TableCaption>
    <TableHead>
      <TableRow>
        <TableCell><CheckBox /></TableCell>
        <TableCell>
          <Link href="/#">
            Name
            <Icon icon="CaretUp" />
          </Link>
        </TableCell>
        <TableCell>
          <Link href="/#">
            Last
            <Icon icon="CaretDown" />
          </Link>
        </TableCell>
        <TableCell>Surname</TableCell>
        <TableCell>Gender</TableCell>
        <TableCell>Age</TableCell>
        <TableCell>Actions</TableCell>
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
        <TableCell>
          <DropDownStory />
        </TableCell>
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
)
