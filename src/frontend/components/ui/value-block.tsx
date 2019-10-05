import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import WrapperBox from './wrapper-box'
import Label from './label'

const OverlayLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  transition: border-width 0.2s;
  &:hover {
    transition: border-width 0.2s;
    border-bottom: 5px solid ${({ theme }): string => theme.colors.primary};
  }
`

const Level = styled.div.attrs({
  className: 'level',
})`
  color: ${(props): string => props.color || props.theme.colors.primary};
  margin-top: 8px;

  & .value {
    font-size: 34px;
  }

  & .icon {
    font-size: 34px;
  }
`

/**
 * Simple Widget, which can be used in the dashboard
 *
 * @name ValueBlock
 * @component
 * @example
 * return (
 *   <WrapperBox><Columns>
 *     <Column><ValueBlock  icon="fa fa-bomb" value="5">
 *       Utils
 *     </ValueBlock></Column>
 *     <Column><ValueBlock  icon="fa fa-star" value="12" href="/api/resourceName">
 *       Are
 *     </ValueBlock></Column>
 *     <Column><ValueBlock  icon="fa fa-cog" value="5" color="red">
 *       Awesome
 *     </ValueBlock></Column>
 *   </Columns></WrapperBox>
 * )
 */
const ValueBlock: React.FC<Props> = (props) => {
  const { icon, value, children, color, href, label } = props

  return (
    <WrapperBox border style={{ position: 'relative' }}>
      {href ? <OverlayLink to={href} /> : ''}
      { label ? <Label>{label}</Label> : '' }
      <Level color={color}>
        <div className="value">
          {value}
        </div>
        <div className="icon">
          <i className={icon} />
        </div>
      </Level>
      {children}
    </WrapperBox>
  )
}

/**
 * @memberof ValueBlock
 */
type Props = {
  /**
   * Icon class: i.e "fa fa-bomb"
   */
  icon?: string;
  /**
   * Value string which
   */
  value?: string | number;
  /**
   * Content inside a block
   */
  children?: ReactNode;
  /**
   * Optional color
   */
  color?: string;
  /**
   * Link url if the block should be clickable
   */
  href?: string;
  /**
   * Label of the block
   */
  label?: string;
}

export default ValueBlock
