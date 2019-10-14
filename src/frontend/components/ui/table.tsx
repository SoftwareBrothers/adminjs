import styled from 'styled-components'

/**
 * Simple compnent for styling tables
 *
 * @component
 * @example
 * return (
 * <WrapperBox border>
 *   <h1>Table Information</h1>
 *   <Table>
 *     <thead>
 *       <tr>
 *         <th><Label>Label1</Label></th>
 *         <th><Label>Label2</Label></th>
 *       </tr>
 *     </thead>
 *     <tbody>
 *       <tr>
 *         <td>Value1</td>
 *         <td>Value12</td>
 *       </tr>
 *       <tr>
 *         <td>Value1</td>
 *         <td>Value12</td>
 *       </tr>
 *     </tbody>
 *   </Table>
 * </WrapperBox>
 * )
 */
const Table = styled.table.attrs({
  className: 'table is-fullwidth',
})`
  background: transparent;

  & > thead > tr > th {
    border: none;
  }

  & tr.is-selected {
    background: ${({ theme }): string => theme.colors.primary};
  }

  & tr:hover {
    background: ${({ theme }): string => theme.colors.superLightBack};
  }

  td {
    color: ${({ theme }): string => theme.colors.defaultText};
    padding: ${({ theme }): string => theme.sizes.padding};
    border-color: ${({ theme }): string => theme.colors.border};
  }
`

export default Table
