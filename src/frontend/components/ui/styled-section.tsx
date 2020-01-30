import styled from 'styled-components'

/**
 * Marks group of fields as a section
 *
 * @component
 */
const StyledSection = styled.section`
  border-left: ${({ theme }): string => theme.space.sm} solid ${({ theme }): string => theme.colors.bluePale};
  padding-left: ${({ theme }): string => theme.space.default};
`

export default StyledSection
