import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { Box, H5, H2, Label, Illustration, Input, FormGroup, Button, Text, Icon, Link, MessageBox } from '../design-system'

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
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
        <Box bg="white" height="440px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
          <Box
            bg="bluePrimary"
            color="white"
            p="x3"
            width="380px"
            flexGrow={0}
            display={['none', 'none', 'block']}
            position="relative"
          >
            <H2 fontWeight="lighter">Welcome</H2>
            <Text fontWeight="lighter" mt="default">
              To AdminBro - the best admin framework for Node.js apps, based on React.
            </Text>
            <Text textAlign="center" p="xxl">
              <Box display="inline" mr="default">
                <Illustration variant="Planet" width={82} height={91} />
              </Box>
              <Box display="inline">
                <Illustration variant="Astronaut" width={82} height={91} />
              </Box>
              <Box display="inline" position="relative" top="-20px">
                <Illustration variant="FlagInCog" width={82} height={91} />
              </Box>
            </Text>
            <Box position="absolute" left={0} bottom={5} right={0}>
              <Text fontWeight="lighter" variant="sm" textAlign="center">
                Made with
                <Icon icon="FavoriteFilled" color="love" mx="sm" />
                by
                <Link
                  href="http://softwarebrothers.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  mx="sm"
                  color="white"
                >
                  SoftwareBrothers
                </Link>
              </Text>
            </Box>
          </Box>
          <Box
            as="form"
            action={action}
            method="POST"
            p="x3"
            flexGrow={1}
            width={['100%', '100%', '480px']}
          >
            <H5>
              <Box as="span" mr="lg"><Illustration variant="AdminBroLogo" width={36} height={36} /></Box>
              AdminBro
            </H5>
            {message && <MessageBox my="lg" message={message} variant="danger" />}
            <FormGroup>
              <Label required>Email</Label>
              <Input name="email" placeholder="Your Email Address" />
            </FormGroup>
            <FormGroup>
              <Label required>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
              />
            </FormGroup>
            <Text mt="xl" textAlign="center">
              <Button variant="primary">
                Login
              </Button>
            </Text>
          </Box>
        </Box>
      </Wrapper>
    </React.Fragment>
  )
}

export default Login
