import styled from 'styled-components'
import { layout, LayoutProps } from 'styled-system'
import { cssClass } from '../../utils/css-class'

/**
 * Main Table wrapper. Along with _TableRow_, _TableCell_, _TableCaption_,
 * _TableHead_ and _TableBody_ gives you the powerful tool for building tables.
 *
 *
 * Props:
 * - _Table_: {@link LayoutProps} & standard table html props
 * - _TableBody_: standard tbody html props
 * - _TableCell_: {@link SpaceProps} & {@link ColorProps} & standard td html props
 * - _TableHead_: standard thead html props
 * - _TableRow_:  standard tr html props
 *
 * Example
 * ```javascript
 * import { Table, TableRow, TableCell, TableCaption, TableHead, TableBody } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Atoms
 * @example
 * return (
 * <Box pt="x4">
 * <Table>
 *   <TableCaption>
 *     <Text as="span">Monthly savings</Text>
 *     <Button variant="text" size="sm">
 *       <Icon icon="Delete" />
 *       Remove
 *     </Button>
 *   </TableCaption>
 *   <TableHead>
 *     <TableRow>
 *       <TableCell><CheckBox /></TableCell>
 *       <TableCell>
 *         <Link href="#">
 *           Name
 *           <Icon icon="CaretUp" />
 *         </Link>
 *       </TableCell>
 *       <TableCell>
 *         <Link href="#">
 *           Last
 *           <Icon icon="CaretDown" />
 *         </Link>
 *       </TableCell>
 *       <TableCell>Surname</TableCell>
 *       <TableCell>Gender</TableCell>
 *       <TableCell>Age</TableCell>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell><CheckBox /></TableCell>
 *       <TableCell>Value 1</TableCell>
 *       <TableCell>Value 2</TableCell>
 *       <TableCell>Value 2</TableCell>
 *       <TableCell>Value 2</TableCell>
 *       <TableCell>Value 2</TableCell>
 *     </TableRow>
 *     <TableRow>
 *       <TableCell><CheckBox /></TableCell>
 *       <TableCell>Value 1</TableCell>
 *       <TableCell>Value 2</TableCell>
 *       <TableCell>Value 2</TableCell>
 *       <TableCell>Value 2</TableCell>
 *       <TableCell>Value 2</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * </Box>
 * )
 */
const Table = styled.table<LayoutProps>`
  position: relative;
  font-family: ${({ theme }): string => theme.font};
  color: ${({ theme }): string => theme.colors.grey100};

  ${layout};
  border-collapse: collapse;
`

Table.defaultProps = {
  width: 1,
  className: cssClass('Table'),
}

export default Table
