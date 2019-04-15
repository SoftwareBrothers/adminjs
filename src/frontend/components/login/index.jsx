import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { BorderBox, StyledButton, PropertyInEdit } from '../layout'
import { colors, fonts, sizes } from '../../styles/variables'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    background: ${colors.bck};
    font-size: ${fonts.base};
  }

  a {
    color: ${colors.primary};
  }
`

const Login = (props) => {
  const { action, message } = props
  const email = { name: 'email', label: 'Your email' }
  const password = { name: 'password', label: 'Password' }

  const FlexWrapper = styled.section`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  const LoginBox = styled.section`
    width: 414px;
    & ${StyledButton} {
      margin: ${sizes.paddingLayout} 0;
    }

    & .content {
      text-align: center;
      border-bottom: 1px solid ${colors.border};
      margin: 0 -${sizes.paddingLayout} ${sizes.paddingLayout};
      padding-bottom: ${sizes.paddingLayout};
    }
  `

  return (
    <React.Fragment>
      <GlobalStyle />
      <FlexWrapper>
        <LoginBox>
          <BorderBox>
            <div className="content">
              <h1>Welcome!</h1>
              <p>Please login to proceed to the admin panel</p>
            </div>
            {message && <div className="notification is-danger">{message}</div>}
            <form action={action} method="POST">
              <PropertyInEdit property={email} className="field">
                <input type="text" name="email" placeholder="Your Email Address" className="input" />
              </PropertyInEdit>
              <PropertyInEdit property={password} className="field">
                <input type="password" name="password" placeholder="Password" className="input" />
              </PropertyInEdit>
              <StyledButton as="button" type="submit" className="is-primary is-fullwidth">
                Login
              </StyledButton>
            </form>
          </BorderBox>
        </LoginBox>
      </FlexWrapper>
    </React.Fragment>
  )
}

export default Login
