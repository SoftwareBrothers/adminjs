import React from 'react'
import styled from 'styled-components'

const StyledColumns = styled.section.attrs({
  className: 'columns is-multiline',
})`

`

/**
 * Columns wrapper for the grid in AdminBro. It uses [bulma](https://bulma.io/documentation/) grid.
 *
 * Example usage with {@link Column}
 * ```JavaScript
 * import { Column, Columns } from 'admin-bro'
 * //...
 * return (
 *   <columns>
 *      <column width={8}>
 *        Some content on the left
 *      </column>
 *      <column width={4}>
 *        Some content on the right
 *      </column>
 *   </columns>
 *  )
 * ```
 *
 * @see https://bulma.io/documentation/
 * @see Column
 *
 * @component
 * @example
 * return (
 *   <Columns>
 *      <Column width={8}>
 *        Some content on the left
 *      </Column>
 *      <Column width={4}>
 *        Some content on the right
 *      </Column>
 *   </Columns>
 * )
 */
const Columns: React.FC = props => <StyledColumns {...props} />

export default Columns
