import React from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle } from 'styled-components'

import WrapperBox from '../ui/wrapper-box'
import StyledButton from '../ui/styled-button'
import PropertyInEdit from '../ui/property-in-edit'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.superDarkBck};
    font-size: ${({ theme }) => theme.fonts.base};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`

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
    margin: ${({ theme }) => theme.sizes.paddingLayout} 0;
  }

  & .content {
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => `0 -${theme.sizes.paddingLayout} ${theme.sizes.paddingLayout}`};
    padding-bottom: ${({ theme }) => theme.sizes.paddingLayout};
  }
`

const Login = (props) => {
  const { action, message } = props
  const email = { name: 'email', label: 'Your email' }
  const password = { name: 'password', label: 'Password' }

  return (
    <React.Fragment>
      <GlobalStyle />
      <FlexWrapper>
        <LoginBox>
          <WrapperBox border>
            <div className="content">
              <h1 style={{ marginTop: 25, marginBottom: 25 }}>Welcome!</h1>
              <p>Please login to proceed to the admin panel</p>
            </div>
            {message && <div className="notification is-danger">{message}</div>}
            <form action={action} method="POST" style={{ marginBottom: 30 }}>
              <PropertyInEdit property={email} className="field">
                <input type="text" name="email" id="email" placeholder="Your Email Address" className="input" />
              </PropertyInEdit>
              <PropertyInEdit property={password} className="field">
                <input type="password" name="password" id="password" placeholder="Password" className="input" />
              </PropertyInEdit>
              <StyledButton as="button" type="submit" className="is-primary is-fullwidth" style={{ marginTop: 40 }}>
                Login
              </StyledButton>
            </form>
          </WrapperBox>
        </LoginBox>
      </FlexWrapper>
    </React.Fragment>
  )
}

Login.propTypes = {
  message: PropTypes.string,
  action: PropTypes.string.isRequired,
}

Login.defaultProps = {
  message: null,
}

export default Login
