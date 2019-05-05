import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import WrapperBox from '../ui/wrapper-box'
import { colors } from '../../styles/variables'
import { childrenType } from '../../types'

const Level = styled.div.attrs({
  className: 'level',
})`
  color: ${props => props.color};
  margin-top: 8px;

  & .value {
    font-size: 34px;
  }

  & .icon {
    font-size: 34px;
  }
`

export default class ValueBlock extends React.PureComponent {
  render() {
    const { icon, value, children, color } = this.props

    return (
      <WrapperBox border>
        {children}
        <Level color={color}>
          <div className="value">
            {value}
          </div>
          <div className="icon">
            <i className={icon} />
          </div>
        </Level>
      </WrapperBox>
    )
  }
}

ValueBlock.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: childrenType,
  color: PropTypes.string,
}

ValueBlock.defaultProps = {
  color: colors.primary,
  children: null,
  value: null,
  icon: null,
}
