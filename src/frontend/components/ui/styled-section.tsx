import styled from 'styled-components'

/**
 * Marks group of fields as a section
 *
 * @component
 *
 * @example
 * const property = {
 *   label: 'My amazing property',
 *   name: 'myAmazingProperty',
 * }
 * return (
 * <StyledSection>
 *  <PropertyInEdit property={property}>
 *    <input className="input" />
 *  </PropertyInEdit>
 *  <p>
 *    <StyledButton>
 *      Add new item in section
 *    </StyledButton>
 *  </p>
 * </StyledSection>
 * )
 */
const StyledSection = styled.section`
  border-left: ${({ theme }): string => theme.sizes.paddingMin} solid ${({ theme }): string => theme.colors.lightBck};
  padding-left: ${({ theme }): string => theme.sizes.padding};
`

export default StyledSection
