import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, TableCaption } from '../atoms/table'
import { CheckBox } from '../atoms/check-box'
import { Link } from '../atoms/link'
import { DropDownStory } from '../molecules/drop-down.stories'
import { Icon } from '../atoms/icon'
import { Button } from '../atoms/button'

// eslint-disable-next-line import/prefer-default-export
export const TableStory = () => (
  <Table>
    <TableCaption>
      Monthly savings
      <Button variant="text" size="sm">
        <Icon icon="Delete" />
        Remove
      </Button>
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
        <TableCell>
          <DropDownStory />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
)
