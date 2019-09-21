import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import WrapperBox from './wrapper-box'
import { childrenType } from '../../types'
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
    border-bottom: 5px solid ${({ theme }) => theme.colors.primary};
  }
`

const Level = styled.div.attrs({
  className: 'level',
})`
  color: ${props => props.color || props.theme.colors.primary};
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
export default class ValueBlock extends React.PureComponent {
  render() {
    const { icon, value, children, color, href, label } = this.props

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
}

ValueBlock.propTypes = {
  /**
   * Icon class: i.e "fa fa-bomb"
   */
  icon: PropTypes.string,
  /**
   * Value string which
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Content inside a block
   */
  children: childrenType,
  /**
   * Optional color
   */
  color: PropTypes.string,
  /**
   * Link url if the block should be clickable
   */
  href: PropTypes.string,
  /**
   * Label of the block
   */
  label: PropTypes.string,
}

ValueBlock.defaultProps = {
  color: null,
  children: null,
  value: null,
  label: null,
  href: null,
  icon: null,
}
