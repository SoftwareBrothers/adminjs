import React from 'react'
import styled from 'styled-components'
import { SpaceProps, space } from 'styled-system'
import Icon from '../../atoms/icon'
import Text from '../../atoms/text'
import Box from '../../atoms/box'
import { cssClass } from '../../utils/css-class'

/**
 * Handler which is invoked when user clicks given step
 *
 * @alias OnStepClickHandler
 * @memberof Step
 */
export type OnStepClickHandler = (
  /**
   * The same number what was passed to a {@link Step}
   */
  number?: number | string
) => boolean | void

/**
 * @alias StepProps
 * @memberof Step
 */
export type StepProps = {
  /** number presented in a circle */
  number?: number | string;
  /** indicates if given step is done */
  completed?: boolean;
  /** indicates if given step is active */
  active?: boolean;
  /** turn off any  */
  disabled?: boolean;
  /** handler which passes a number of the step in an argument */
  onClick?: OnStepClickHandler;
  /** Optional className */
  className?: string;
}

const Circle = styled(Box)`
  border-width: 1px;
  border-style: solid;
  border-radius: 9999px;
  text-align: center;
`

Circle.defaultProps = {
  py: 'default',
  px: 'default',
  minWidth: '34px',
  height: '34px',
}

type StyledStepProps = SpaceProps & Pick<StepProps, 'active' | 'disabled'>

const StyledStep = styled.div<StyledStepProps>`
  flex: 1 1 0px;
  display: flex;
  flex-direction: row;

  & > ${Box} {
    ${({ disabled }): string => (!disabled ? 'cursor: pointer' : '')};
    border-bottom: 2px solid ${({ active, theme }): string => (active ? theme.colors.primary100 : 'transparent')};
  }
  
  ${space};
`

/**
 * Step represents one of the tab in placed inside {@link Stepper} component.
 * You can use it alone or with before-mentioned {@link Stepper}.
 *
 * @subcategory Molecules
 * @component
 * @example <caption>Regular step</caption>
 * return (
 *   <Box p="default">
 *     <Step number="1">Normal Step</Step>
 *  </Box>
 * )
 *
 * @example <caption>Active steps</caption>
 * return (
 *   <Box p="default">
 *     <Step number="1" active>I am active</Step>
 *  </Box>
 * )
 *
 * @example <caption>Active steps</caption>
 * return (
 *   <Box p="default">
 *     <Step number="1" completed>This was done !!!</Step>
 *  </Box>
 * )
 *
 * @example <caption>Clickable step</caption>
 * const onClick = () => alert('Why did you click me?')
 *
 * return (
 *   <Box p="default">
 *     <Step number="1" onClick={onClick}>Click me if you dare</Step>
 *  </Box>
 * )
 *
 */
export const Step: React.FC<StepProps> = (props) => {
  const { number, completed, children, active, disabled, onClick, className } = props

  return (
    <StyledStep
      active={active}
      disabled={disabled || !onClick}
      className={cssClass('Step', className)}
    >
      <Box
        flexShrink={1}
        flexGrow={0}
        flex
        flexDirection="row"
        pt="lg"
        pb="default"
        onClick={(): boolean | void => !disabled && onClick && onClick(number)}
      >
        <Circle
          bg={completed ? 'grey40' : 'transparent'}
          borderColor={active ? 'primary100' : 'grey40'}
          color={active ? 'primary100' : 'grey40'}
        >
          {completed ? (
            <Icon icon="Checkmark" color="white" />
          ) : number}
        </Circle>
        <Text my="sm" pl="default" py="sm" color={active || completed ? 'grey100' : 'grey40'}>
          {children}
        </Text>
      </Box>
    </StyledStep>
  )
}

export default Step
