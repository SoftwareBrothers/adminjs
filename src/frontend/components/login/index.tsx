import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { Box, H3, Label, Input, FormGroup, Button } from '../design-system'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
  }
`

const Wrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`

type Props = {
  message?: string;
  action: string;
}

const Login: React.FC<Props> = (props) => {
  const { action, message } = props

  return (
    <React.Fragment>
      <GlobalStyle />
      <Wrapper flex variant="grey">
        <Box variant="white" width="500px" height="400px">
          <H3>Please login to proceed to the admin panel</H3>
          {message && <Box my="lg">{message}</Box>}
          <Box as="form" action={action} method="POST">
            <FormGroup>
              <Label>Email</Label>
              <Input name="email" placeholder="Your Email Address" />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
              />
            </FormGroup>
            <Box mt="xl">
              <Button variant="primary">
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </React.Fragment>
  )
}

export default Login
