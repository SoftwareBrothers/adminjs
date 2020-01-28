import React from 'react'
import { Box } from './box'
import { Text } from './text'
import { H1, H2, H3, H4, H5, H6 } from './header'
import { Button } from './button'
import { Icon } from './icon'
import { Badge } from './badge'

export default {
  title: 'atoms',
}

const mainVariants: Array<'primary' | 'danger' | 'success' | 'info' | 'secondary'> = [
  'primary', 'danger', 'success', 'info', 'secondary']

export const Typography: React.FC = () => (
  <Box flex>
    <Box width={1 / 2} padding="lg">
      <H1>H1 Header - 40</H1>
      <Text variant="sm" mb={5}>Roboto 40 - line height - 40</Text>
      <H2>H2 Header - 32</H2>
      <Text variant="sm" mb={5}>Roboto 32 - line height - 40</Text>
      <H3>H3 Header - 28</H3>
      <Text variant="sm" mb={5}>Roboto 28 - line height - 32</Text>
      <H4>H4 Header - 24</H4>
      <Text variant="sm" mb={5}>Roboto 24 - line height - 32</Text>
      <H5>H5 Header - 18</H5>
      <Text variant="sm" mb={5}>Roboto 18 - line height - 24</Text>
      <H6>H6 Header - 16</H6>
      <Text variant="sm" mb={5}>Roboto 16 - line height - 24</Text>
    </Box>
    <Box width={1 / 2} padding="lg">
      <Text variant="sm" mb={5}>
        <p>This is small [variant=sm] text</p>
      </Text>
      <Text mb={5}>
        <p>This is regular text</p>
      </Text>
      <Text variant="lg" mb={5}>
        <p>This is a big [variant=lg] text</p>
      </Text>
      <Text variant="xs" mb={5}>
        <p>And there is also a super small [variant=xs] text</p>
      </Text>
    </Box>
  </Box>
)

export const Buttons = () => (
  <Box padding="lg">
    <H3 mb={5}>Buttons</H3>
    <H4 mb={5}>Variants</H4>
    <p>
      <Button>Regular</Button>
      {mainVariants.map(color => (
        <Button key={color} m={3} variant={color}>{color}</Button>
      ))}
      <Button ml={3} variant="text">Text</Button>
    </p>
    <H4 my={5}>Sizes</H4>
    <p>
      <Button size="sm">Small</Button>
      <Button ml={3}>Regular size</Button>
      <Button size="lg" ml={3}>Large</Button>
    </p>
    <H4 my={5}>Icons</H4>
    <p>
      <Button mr={3}>
        <Icon icon="Settings" />
        With icon
      </Button>
      <Button size="icon" mr={3}><Icon icon="Settings" /></Button>
      <Button rounded size="icon" mr={3}><Icon icon="Settings" /></Button>
      <Button variant="danger" mr={3}>
        <Icon icon="Delete" />
        Delete me
      </Button>
    </p>
    <H4 my={5}>State</H4>
    <p>
      <Button disabled>Disabled</Button>
      <Button ml={3} variant="primary" disabled>Disabled</Button>
    </p>
  </Box>
)

export const Badges = () => (
  <Box p="lg">
    <H3 mb={5}>Badges</H3>
    <H4 my={5}>Variants</H4>
    <p>
      <Badge ml={3}>Default</Badge>
      {mainVariants.map(color => (
        <Badge key={color} ml={3} variant={color}>{color}</Badge>
      ))}
    </p>
    <H4 my={5}>Outline</H4>
    <p>
      <Badge ml={3} outline>Default</Badge>
      {mainVariants.map(color => (
        <Badge key={color} ml={3} variant={color} outline>{color}</Badge>
      ))}
    </p>
    <H4 my={5}>Sizes</H4>
    <p>
      <Badge ml={3} variant="primary" size="sm">small</Badge>
      <Badge ml={3} variant="primary">regular</Badge>
      <Badge ml={3} variant="primary" size="lg">large</Badge>
    </p>
  </Box>
)
