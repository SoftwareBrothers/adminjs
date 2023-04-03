import {
  Box, Button, FormGroup, H2, H5, Illustration,
  Input, Label, MadeWithLove, MessageBox, Text, BoxProps,
} from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'

import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from '../../hooks/index.js'
import { ReduxState } from '../../store/store.js'
import { allowOverride } from '../../hoc/allow-override.js'

const Wrapper = styled(Box)<BoxProps>`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`

const StyledLogo = styled.img`
  max-width: 200px;
  margin: ${({ theme }) => theme.space.md} 0;
`

export type LoginProps = {
  message?: string;
  action: string;
}

export const Login: React.FC<LoginProps> = (props) => {
  const { action, message } = props
  const { translateComponent, translateMessage } = useTranslation()
  const branding = useSelector((state: ReduxState) => state.branding)

  return (
    <Wrapper flex variant="grey">
      <Box bg="white" height="440px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
        <Box
          bg="primary100"
          color="white"
          p="x3"
          width="380px"
          flexGrow={0}
          display={['none', 'none', 'block']}
          position="relative"
        >
          <H2 fontWeight="lighter">{translateComponent('Login.welcomeHeader')}</H2>
          <Text fontWeight="lighter" mt="default">
            {translateComponent('Login.welcomeMessage')}
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
        </Box>
        <Box
          as="form"
          action={action}
          method="POST"
          p="x3"
          flexGrow={1}
          width={['100%', '100%', '480px']}
        >
          <H5 marginBottom="xxl">
            {branding.logo ? (
              <StyledLogo
                src={branding.logo}
                alt={branding.companyName}
              />
            ) : branding.companyName}
          </H5>
          {message && (
            <MessageBox
              my="lg"
              message={message.split(' ').length > 1 ? message : translateMessage(message)}
              variant="danger"
            />
          )}
          <FormGroup>
            <Label required>{translateComponent('Login.properties.email')}</Label>
            <Input name="email" placeholder={translateComponent('Login.properties.email')} />
          </FormGroup>
          <FormGroup>
            <Label required>{translateComponent('Login.properties.password')}</Label>
            <Input
              type="password"
              name="password"
              placeholder={translateComponent('Login.properties.password')}
              autoComplete="new-password"
            />
          </FormGroup>
          <Text mt="xl" textAlign="center">
            <Button variant="contained">
              {translateComponent('Login.loginButton')}
            </Button>
          </Text>
        </Box>
      </Box>
      {branding.withMadeWithLove ? (<Box mt="xxl"><MadeWithLove /></Box>) : null}
    </Wrapper>
  )
}

export default allowOverride(Login, 'Login')
