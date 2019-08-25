import styled from 'styled-components'

const StyledSection = styled.section`
  border-left: ${({ theme }) => theme.sizes.paddingMin} solid ${({ theme }) => theme.colors.lightBck};
  padding-left: ${({ theme }) => theme.sizes.padding};
`

export default StyledSection
