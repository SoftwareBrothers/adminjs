import styled from 'styled-components'

import { Link } from '../link'

const TableHead = styled.thead`
  background: ${({ theme }): string => theme.colors.greyPale};

  & ${Link} > svg {
    fill: ${({ theme }): string => theme.colors.bluePrimary};
    padding-left: ${({ theme }): string => theme.space[3]};
  }
`

export default TableHead
