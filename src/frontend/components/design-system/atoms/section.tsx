/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import { Box } from './box'

/**
 * Marks group of fields as a section
 *
 * @component
 */
const Section = styled(Box)`
  border-left: ${({ theme }): string => theme.space.sm} solid ${({ theme }): string => theme.colors.bluePale};
  padding-left: ${({ theme }): string => theme.space.default};
`

export { Section }
