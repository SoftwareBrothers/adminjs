/* eslint-disable max-len */
import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { variant as styledVariant, SpaceProps } from 'styled-system'


import { Box } from '../atoms/box'
import { Icon } from '../atoms/icon'
import { Button } from '../atoms/button'
import { cssClass } from '../utils/css-class'

const sizeVariants = styledVariant({
  prop: 'size',
  variants: {
    sm: {
      boxShadow: 'none',
      '& > section, & + section': {
        px: 'lg',
        py: 'default',
      },
      [`& > ${Button}`]: {
        margin: '0px',
      },
    },
  },
})

const variants = (theme: DefaultTheme): Record<string, any> => styledVariant({
  variants: {
    success: {},
    danger: {
      bg: 'errorLight',
      'box-shadow': `0 2px 0 0 ${theme.colors.error};`,
      '& + section': {
        borderColor: 'errorLight',
      },
    },
    info: {
      bg: 'primary20',
      'box-shadow': `0 2px 0 0 ${theme.colors.primary100};`,
      '& + section': {
        borderColor: 'primary20',
      },
    },
  },
})

const StyledMessageBox = styled.div<StyledMessageBoxProps>`
  line-height: ${({ theme }): string => theme.lineHeights.default};
  box-shadow: 0 2px 0 0 ${({ theme }): string => theme.colors.success};
  background: ${({ theme }): string => theme.colors.successLight};
  color: ${({ theme }): string => theme.colors.grey80};
  & > ${Button} {
    float: right;
    margin: 8px;
    & svg {
      fill: ${({ theme }): string => theme.colors.grey80};
    }
  }
  ${({ theme }): any => variants(theme)};
  ${sizeVariants};
`

const StyledCaption = styled(Box)``

StyledCaption.defaultProps = {
  px: 'xl',
  py: 'lg',
}


const StyledChildren = styled(Box)`
  padding: ${({ theme }): string => theme.space.lg} ${({ theme }): string => theme.space.xl};
  background: ${({ theme }): string => theme.colors.white};
  border-style: solid;
  border-width: 0 1px 1px 1px;
  border-color: ${({ theme }): string => theme.colors.successLight};
`

/**
 * Prop Types of a MessageBox component.
 * Apart from those defined below it extends all {@link SpaceProps}
 *
 * @memberof MessageBox
 * @alias MessageBoxProps
 */
type StyledMessageBoxProps = {
  /** Triggered when user clicks close button. If not given close button won't be seen */
  onCloseClick?: () => void;
  /** Title content of a message */
  message?: string;
  /** Variant */
  variant?: 'danger' | 'info' | 'success';
  /** Icon which will be seen in the title */
  icon?: string;
  /** Size variant */
  size?: 'sm';
  /** Optional html style property */
  style?: Record<string, string>;
  /** Optional children, when given component will be expanded */
  children?: React.ReactNode;
}

export type MessageBoxProps = SpaceProps & StyledMessageBoxProps


/**
 * Component responsible for rendering standard danger/info/success
 * messages.
 *
 * It has 2 size versions: default and small. Also it can either contain or
 * don't contain children, which causes different look.
 *
 * Usage
 * ```javascript
 * import { MessageBox, MessageBoxProps } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Molecules
 * @example <caption>Different variants</caption>
 * return (
 *  <Box py="lg">
 *   <MessageBox message="Some default message" onCloseClick={() => alert('close clicked')} />
 *   <MessageBox message="Error message" mt="default" variant="danger" onCloseClick={() => alert('close clicked')} />
 *   <MessageBox message="Info message" mt="default" variant="info" onCloseClick={() => alert('close clicked')} />
 *  </Box>
 * )
 * @example <caption>Different variants with children</caption>
 * return (
 *  <Box py="lg">
 *   <MessageBox message="Some default message" onCloseClick={() => alert('close clicked')}>
 *     With inside text
 *   </MessageBox>
 *   <MessageBox message="Error message" mt="default" variant="danger" onCloseClick={() => alert('close clicked')}>
 *     With inside text
 *   </MessageBox>
 *   <MessageBox message="Info message" mt="default" variant="info" onCloseClick={() => alert('close clicked')}>
 *     With inside text
 *   </MessageBox>
 *  </Box>
 * )
 * @example <caption>Small with an icon and inside text</caption>
 * return (
 *  <Box py="lg">
 *   <MessageBox
 *     size="sm"
 *     message="Info message"
 *     mt="default"
 *     variant="info"
 *     icon="AddComment"
 *     onCloseClick={() => alert('close clicked')}
 *   >
 *     With inside text
 *   </MessageBox>
 *  </Box>
 * )
 */
export const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const { onCloseClick, message, icon, children, variant, size, ...other } = props

  return (
    <Box className={cssClass('MessageBox')} {...other}>
      <StyledMessageBox variant={variant} size={size}>
        {onCloseClick ? (
          <Button variant="text" size="icon" onClick={onCloseClick}>
            <Icon icon="Close" />
          </Button>
        ) : ''}
        <StyledCaption>
          {icon ? (
            <Icon icon={icon} mr="default" />
          ) : ''}
          {message}
        </StyledCaption>
      </StyledMessageBox>
      {children ? (
        <StyledChildren>
          {children}
        </StyledChildren>
      ) : ''}
    </Box>
  )
}

export default MessageBox
