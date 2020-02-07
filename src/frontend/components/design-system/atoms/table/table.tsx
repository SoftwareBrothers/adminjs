import styled from 'styled-components'
import { layout, LayoutProps } from 'styled-system'

/**
 * Main Table wrapper. Along with TableRow, TableCell, TableCaption, TableHead and TableBody
 * gives you the powerful tool for building tables.
 *
 * It takes all the {@link LayoutProps}
 *
 * Example
 * ```javascript
 * import { Table, TableRow, TableCell, TableCaption, TableHead, TableBody } from 'admin-bro'
 * ```
 *
 * @component
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
  color: ${({ theme }): string => theme.colors.black};

  ${layout};
  border-collapse: collapse;
`

Table.defaultProps = {
  width: 1,
}

export default Table
