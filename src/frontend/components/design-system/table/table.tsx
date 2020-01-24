import styled from 'styled-components'
import { layout, LayoutProps } from 'styled-system'

const Table = styled.table<LayoutProps>`
  ${layout};
  border-collapse: collapse;
`

Table.defaultProps = {
  width: 1,
}

export default Table
