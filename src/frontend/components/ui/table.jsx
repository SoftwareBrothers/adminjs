import React from 'react'
import styled from 'styled-components'

import { colors, sizes } from '../../styles/variables'

const StyledTable = styled.table.attrs({
  className: 'table is-fullwidth',
})`
  border: none;
  border-collapse: separate;
  border-spacing: 0;

  & > thead > tr > th {
    border: none;
  }

  & tr.is-selected {
    background: ${colors.primary};
  }

  td {
    color: ${colors.defaultText};
    padding: ${sizes.padding};
    border-color: ${colors.border};
  }
`

/**
 * @classdesc
 * Simple compnent for styling tables
 * @hideconstructor
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
