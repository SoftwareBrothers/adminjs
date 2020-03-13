import styled from 'styled-components'
import {
  color, space,
  ColorProps, SpaceProps,
  TypographyProps,
  typography,
} from 'styled-system'
import { cssClass } from '../utils/css-class'

/**
 * Prop Types of a Label component.
 * Apart from those explicitly specified below it extends all {@link ColorProps},
 * {@link SpaceProps} and {@link TypographyProps}
 *
 * @memberof Label
 * @alias LabelProps
 * @property {string} [...] All props default to _label_ html component like `htmlFor`,
 *                          `id` etc.
 * @property {string} [...] Other props from {@link ColorProps}, {@link SpaceProps}
 *                          and {@link TypographyProps}
 */
export type LabelProps = ColorProps & SpaceProps & TypographyProps & {
  /** If label represents required field - appends star (*) */
  required?: boolean;
  /** If label should be in uppercase version */
  uppercase?: boolean;
  /** By default labels are displayed as a block. You can override this by setting `inline` */
  inline?: boolean;
  /** If label represents disabled field (dimmed version) */
  disabled?: boolean;
}

/**
 * Styled form of <label> element.
 *
 * Usage:
 * ```javascript
 * import { Label, LabelProps } from 'admin-bro'
 * ```
 * @component
 * @subcategory Atoms
 * @example <caption>2 Different versions</caption>
 * return (
 * <Box p="xl">
 *   <Text>
 *     <Label uppercase>Some uppercase label</Label>
 *   </Text>
 *   <Text mt="default">
 *     <Label required>Label for required field</Label>
 *   </Text>
 * </Box>
 * )
 */
export const Label = styled.label<LabelProps>`
  display: ${({ inline }): string => (inline ? 'inline-block' : 'block')};
  font-family: ${({ theme }): string => theme.font};
  font-size: ${({ theme }): string => theme.fontSizes.sm};
  line-height: ${({ theme }): string => theme.lineHeights.default};
  margin-bottom: ${({ theme, inline }): string => (inline ? '0' : theme.space.default)};

  &:before {
    content: "${({ required }): string => (required ? '*' : '')}";
    color: ${({ theme }): string => theme.colors.primary100};
    margin-right: ${({ theme }): string => theme.space.sm};
    display: ${({ required }): string => (required ? 'block-inline' : 'none')};
  }

  ${({ uppercase }): string => (uppercase ? 'text-transform: uppercase;' : '')}

  ${color};
  ${typography};
  ${space};
  ${({ disabled, theme }): string => (disabled ? `color: ${theme.colors.grey40};` : '')}
`

Label.defaultProps = {
  className: cssClass('Label'),
}

export default Label
