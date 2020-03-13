import React from 'react'
import styled from 'styled-components'

import { Box, BoxProps } from '../atoms/box'
import { H4 } from '../atoms/header'
import { cssClass } from '../utils/css-class'

const StyledInfoBox = styled(Box)<BoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

/**
 * @memberof InfoBox
 * @alias InfoBoxProps
 */
export type InfoBoxProps = {
  /** Title of an InfoBox */
  title: string;
  /** Inner content - usually couple of {@link Text} nodes */
  children: React.ReactNode;
  /** Optional testId */
  testId?: string;
}

/**
 * @class
 * Used for all type of information like:
 *
 * > you don't have x - please add first one"
 *
 * in the system.
 *
 * Usage:
 * ```javascript
 * import { InfoBox, InfoBoxProps } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Molecules
 * @example
 * return (
 * <InfoBox title="There are no cars in the system">
 *   <Text>Currently there are no cars in the system</Text>
 *   <Text>To create first click</Text>
 *   <Button mt="lg"><Icon icon="Add" />Create</Button>
 * </InfoBox>
 * )
 */
export const InfoBox: React.FC<InfoBoxProps> = (props) => {
  const { children, title, testId } = props
  return (
    <StyledInfoBox data-testid={testId} variant="white" className={cssClass('InfoBox')}>
      <Box width={1 / 2}>
        <H4 mb="lg">{title}</H4>
        {children}
      </Box>
    </StyledInfoBox>
  )
}

export default InfoBox
