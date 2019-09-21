import React from 'react'
import styled from 'styled-components'

const StyledTable = styled.table.attrs({
  className: 'table is-fullwidth',
})`
  & > thead > tr > th {
    border: none;
  }

  & tr.is-selected {
    background: ${({ theme }) => theme.colors.primary};
  }

  td {
    color: ${({ theme }) => theme.colors.defaultText};
    padding: ${({ theme }) => theme.sizes.padding};
    border-color: ${({ theme }) => theme.colors.border};
  }
`

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
const Table = props => (<StyledTable {...props} />)

export default Table
