import React from 'react'
import styled from 'styled-components'

const StyledColumn = styled.section.attrs<Props>(({ width = 4, offset = 0 }) => ({
  className: `column is-${width}-desktop is-offset-${offset}`,
}))`

`

/**
 * Colum representation in AdminBro grid. It uses [bulma](https://bulma.io/documentation/) grid.
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
 * @see {@link Columns}
 * @component
 *
 * @example <caption>Layout with text blocks by using column</caption>
 * return (
 *   <Columns>
 *     <Column width={2} offset={2}>
 *       <WrapperBox>Some wrapped text</WrapperBox>
 *     </Column>
 *     <Column width={3}>
 *     <WrapperBox border>Inside Border</WrapperBox>
 *     </Column>
 *     <Column width={5} style={{background: '#ccc'}}>normal text</Column>
 *   </Columns>
 * )
 */
const Column: React.FC<Props> = props => <StyledColumn {...props} />

/**
 * @memberof Column
 */
type Props = {
  /**
   * Width of the column in 12 column grid, default to 4
   */
  width?: number;
  /**
   * column offset, default to 0
   */
  offset?: number;
}

export default Column
