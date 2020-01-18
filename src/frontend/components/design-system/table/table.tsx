import styled from 'styled-components'
import { layout, LayoutProps } from 'styled-system'

const Table = styled.table<LayoutProps>`
  ${layout};
`

Table.defaultProps = {
  width: 1,
}

export default Table
