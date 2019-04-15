import React from 'react'
import styled from 'styled-components'

import BorderBox from '../layout/border-box'
import { fonts, colors } from '../../styles/variables'

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
    const { icon, value, children, color = colors.primary } = this.props

    return (
      <BorderBox>
        {children}
        <Level color={color}>
          <div className="value">
            {value}
          </div>
          <div className="icon">
            <i className={icon} />
          </div>
        </Level>
      </BorderBox>
    )
  }
}
