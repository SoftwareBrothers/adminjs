import styled from 'styled-components'

/**
 * @component
 * @private
 */
const TableHead = styled.thead`
  background: ${({ theme }): string => theme.colors.greyPale};

  & a {
    color: ${({ theme }): string => theme.colors.grey};
    text-decoration: none;
    font-size: ${({ theme }): string => theme.fontSizes.sm};
  }
`

export default TableHead
