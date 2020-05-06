import React from 'react'
import styled from 'styled-components'

import { Box, H2, H5, H4, Text, Illustration, IllustrationProps, Button } from '../design-system'
import { useTranslation } from '../../hooks'

const pageHeaderHeight = 284
const pageHeaderPaddingY = 74
const pageHeaderPaddingX = 250

const DashboardHeader: React.FC = () => {
  const { translateMessage } = useTranslation()
  return (
    <Box position="relative" overflow="hidden">
      <Box
        position="absolute"
        top={50}
        left={-10}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="Rocket" />
      </Box>
      <Box
        position="absolute"
        top={-70}
        right={-15}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="Moon" />
      </Box>
      <Box
        bg="grey100"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={['default', 'lg', pageHeaderPaddingX]}
      >
        <Text textAlign="center" color="white">
          <H2>{translateMessage('welcomeOnBoard_title')}</H2>
          <Text opacity="0.8">
            {translateMessage('welcomeOnBoard_subtitle')}
          </Text>
        </Text>
      </Box>
    </Box>
  )
}

type BoxType = {
  variant: string;
  title: string;
  subtitle: string;
  href: string;
}

const boxes = ({ translateMessage }): Array<BoxType> => [{
  variant: 'Planet',
  title: translateMessage('addingResources_title'),
  subtitle: translateMessage('addingResources_subtitle'),
  href: 'https://softwarebrothers.github.io/admin-bro-dev/tutorial-03-passing-resources.html',
}, {
  variant: 'DocumentCheck',
  title: translateMessage('customizeResources_title'),
  subtitle: translateMessage('customizeResources_subtitle'),
  href: 'https://softwarebrothers.github.io/admin-bro-dev/tutorial-04-customizing-resources.html',
}, {
  variant: 'DocumentSearch',
  title: translateMessage('customizeActions_title'),
  subtitle: translateMessage('customizeActions_subtitle'),
  href: 'https://softwarebrothers.github.io/admin-bro-dev/tutorial-05-actions.html',
}, {
  variant: 'FlagInCog',
  title: translateMessage('writeOwnComponents_title'),
  subtitle: translateMessage('writeOwnComponents_subtitle'),
  href: 'https://softwarebrothers.github.io/admin-bro-dev/tutorial-06-writing-react-components.html',
}, {
  variant: 'Folders',
  title: translateMessage('customDashboard_title'),
  subtitle: translateMessage('customDashboard_subtitle'),
  href: 'https://softwarebrothers.github.io/admin-bro-dev/tutorial-07-custom-dashboard.html',
}, {
  variant: 'Astronaut',
  title: translateMessage('roleBasedAccess_title'),
  subtitle: translateMessage('roleBasedAccess_subtitle'),
  href: 'https://softwarebrothers.github.io/admin-bro-dev/tutorial-08-rbac.html',
}]

const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
  color: ${({ theme }): string => theme.colors.grey100};
  text-decoration: none;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${({ theme }): string => theme.colors.primary100};
    box-shadow: ${({ theme }): string => theme.shadows.cardHover};
  }
`

Card.defaultProps = {
  variant: 'white',
  boxShadow: 'card',
}

const Dashboard: React.FC = () => {
  const { translateMessage, translateButton } = useTranslation()
  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={['xl', 'xl', '-100px']}
        mb="xl"
        mx={[0, 0, 0, 'auto']}
        px={['default', 'lg', 'xxl', '0']}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        {boxes({ translateMessage }).map((box, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
            <Card as="a" href={box.href}>
              <Text textAlign="center">
                <Illustration
                  variant={box.variant as IllustrationProps['variant']}
                  width={100}
                  height={70}
                />
                <H5 mt="lg">{box.title}</H5>
                <Text>{box.subtitle}</Text>
              </Text>
            </Card>
          </Box>
        ))}
        <Box width={[1, 1, 1 / 2]} p="lg">
          <Card as="a" flex href="https://softwarebrothers.co/blog/">
            <Box flexShrink={0}><Illustration variant="AdminBroLogo" /></Box>
            <Box ml="xl">
              <H4>{translateMessage('checkoutBlog_title')}</H4>
              <Text>{translateMessage('checkoutBlog_subtitle')}</Text>
            </Box>
          </Card>
        </Box>
        <Box width={[1, 1, 1 / 2]} p="lg">
          <Card as="a" flex href="https://github.com/SoftwareBrothers/admin-bro/issues">
            <Box flexShrink={0}><Illustration variant="GithubLogo" /></Box>
            <Box ml="xl">
              <H4>{translateMessage('foundBug_title')}</H4>
              <Text>{translateMessage('foundBug_subtitle')}</Text>
            </Box>
          </Card>
        </Box>
        <Box variant="white" boxShadow="card" width={1} m="lg">
          <Text textAlign="center">
            <Illustration variant="SoftwareBrothersLogo" />
            <H4>{translateMessage('needMoreSolutions_title')}</H4>
            <Text>{translateMessage('needMoreSolutions_subtitle')}</Text>
            <Text mt="xxl">
              <Button
                as="a"
                size="sm"
                variant="primary"
                href="https://softwarebrothers.co/services"
              >
                {translateButton('contactUs')}
              </Button>
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
