import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  border-left: ${({ theme }) => theme.sizes.paddingMin} solid ${({ theme }) => theme.colors.lightBck};
  padding-left: ${({ theme }) => theme.sizes.padding};
`

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
const StyledSection = props => (<Section {...props} />)
export default StyledSection
