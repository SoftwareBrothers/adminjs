import styled, { css } from 'styled-components'
import { SpaceProps, space } from 'styled-system'

import { Label } from '../../atoms/label'
import { Button } from '../../atoms/button'
import { Input } from '../../atoms/input'
import { Link } from '../../atoms/link'
import InputGroup from './input-group'

const formGroupDisabledCSS = css`
  color: ${({ theme }): string => theme.colors.grey40};
`

const formGroupWithErrorCSS = css`
  color: ${({ theme }): string => theme.colors.error};
  ${Input} {
    color: ${({ theme }): string => theme.colors.error};
    border-color: ${({ theme }): string => theme.colors.error};
  }
  &&& ${Label} {
    color: ${({ theme }): string => theme.colors.error};
    &:before {
      color: ${({ theme }): string => theme.colors.error};
    }
  }
  &&& ${Label}, &&& ${Button}, &&& ${Link} {
    border-color: ${({ theme }): string => theme.colors.error};
  }
`

/**
 * Props for FormGroup. Apart from props defined here FormGroup supports also all {@link SpaceProps}
 * @alias FormGroupProps
 * @memberof FormGroup
 */
export type FormGroupProps = SpaceProps & {
  /**
   * If given FormGroup has error
   */
  error?: boolean;
  /**
   * If given FormGroup should be disabled
   */
  disabled?: boolean;
  /**
   * if given form group should be rendered in a filter
   */
  variant?: 'filter';
}

/**
 * FormGroup comes with other, from-related components like: FormMessage and InputGroup.
 * Together they allow you to build form elements.
 *
 * Usage:
 * ```javascript
 * import { FormGroup, FormGroupProps, InputGroup, FormMessage } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Molecules
 * @example <caption>Example 1: input with all sorts of buttons</caption>
 * return (
 * <Box py="xl">
 *   <FormGroup>
 *     <Label required>Name</Label>
 *     <InputGroup>
 *       <Button variant="primary" size="icon">
 *         <Icon icon="ChevronRight" />
 *       </Button>
 *       <Input />
 *       <Label>100 KM</Label>
 *       <Button variant="primary" size="icon">
 *         <Icon icon="ChevronRight" />
 *       </Button>
 *     </InputGroup>
 *     <FormMessage>And the optional message</FormMessage>
 *   </FormGroup>
 * </Box>
 * )
 * @example <caption>Example 2: the same input with errors</caption>
 * return (
 * <Box py="xl">
 *   <FormGroup error>
 *     <Label required>Name</Label>
 *     <InputGroup>
 *       <Button variant="primary" size="icon">
 *         <Icon icon="ChevronRight" />
 *       </Button>
 *       <Input />
 *       <Label>100 KM</Label>
 *       <Button variant="primary" size="icon">
 *         <Icon icon="ChevronRight" />
 *       </Button>
 *     </InputGroup>
 *     <FormMessage>And the optional message</FormMessage>
 *   </FormGroup>
 * </Box>
 * )
 * @example <caption>Example 3: disabled field</caption>
 * return (
 * <Box py="xl">
 *   <FormGroup disabled>
 *     <Label>Disabled field</Label>
 *     <InputGroup>
 *       <Input disabled />
 *     </InputGroup>
 *     <FormMessage />
 *   </FormGroup>
 * </Box>
 * )
 * @example <caption>Example 4: with a link</caption>
 * return (
 * <Box py="xl">
 *   <FormGroup>
 *     <Label>Some form data with button link</Label>
 *     <InputGroup>
 *       <Input />
 *       <Link href="#someHref">This is link</Link>
 *     </InputGroup>
 *     <FormMessage />
 *   </FormGroup>
 * </Box>
 * )
 */
export const FormGroup = styled.div<FormGroupProps>`
  width: 100%;
  ${({ error }): any => (error ? formGroupWithErrorCSS : '')};
  ${({ disabled }): any => (disabled ? formGroupDisabledCSS : '')};
  ${space};

  & > ${Input} {
    width: 100%;
  }

  & ${Input} {
    ${({ variant, theme }): string => (variant === 'filter' ? `border-color: ${theme.colors.filterInputBorder}` : '')};
    ${({ variant, theme }): string => (variant === 'filter' ? `color: ${theme.colors.white}` : '')};
    &:hover {
      border-color: ${({ variant, theme }): string => (variant === 'filter' ? theme.colors.grey60 : theme.colors.grey60)};
    }
  }

  & ${InputGroup} {
    ${Label}, ${Button}:last-child, ${Link}:last-child {
      ${({ variant, theme }): string => (variant === 'filter' ? `border-color: ${theme.colors.filterInputBorder}` : '')};
    }
  }
`

FormGroup.defaultProps = {
  mb: 'lg',
}

export default FormGroup
