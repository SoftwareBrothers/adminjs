import React from 'react'
import * as theme from '../theme'
import { Box } from './box'
import { Text } from './text'
import { H1, H2, H3, H4, H5, H6 } from './header'
import { Button } from './button'
import { Icon } from './icon'
import { Badge } from './badge'

export default {
  title: 'Atoms',
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
    <H3 my="lg">Buttons</H3>
    <H4 my="lg">Variants</H4>
    <Text>
      <Button>Regular</Button>
      {mainVariants.map(color => (
        <Button key={color} m="default" variant={color}>{color}</Button>
      ))}
      <Button ml="default" variant="text">Text</Button>
    </Text>
    <H4 my="lg">Sizes</H4>
    <Text>
      <Button size="sm">Small</Button>
      <Button ml="default">Regular size</Button>
      <Button size="lg" ml="default">Large</Button>
    </Text>
    <H4 my="lg">Icons</H4>
    <Text>
      <Button mr="default">
        <Icon icon="Settings" />
        With icon
      </Button>
      <Button size="icon" mr="default"><Icon icon="Settings" /></Button>
      <Button rounded size="icon" mr="default"><Icon icon="Settings" /></Button>
      <Button variant="danger" mr="default">
        <Icon icon="Delete" />
        Delete me
      </Button>
      <Button mr="default" variant="text" size="sm">
        <Icon icon="Add" />
        Create new item
      </Button>
    </Text>
    <H4 my="lg">State</H4>
    <Text>
      <Button disabled>Disabled</Button>
      <Button ml="default" variant="primary" disabled>Disabled</Button>
    </Text>
  </Box>
)

export const Badges = () => (
  <Box p="lg">
    <H3 mb="xl">Badges</H3>
    <H4 my="xl">Variants</H4>
    <p>
      <Badge ml="default">Default</Badge>
      {mainVariants.map(color => (
        <Badge key={color} ml="default" variant={color}>{color}</Badge>
      ))}
    </p>
    <H4 my="xl">Outline</H4>
    <p>
      <Badge ml="default" outline>Default</Badge>
      {mainVariants.map(color => (
        <Badge key={color} ml="default" variant={color} outline>{color}</Badge>
      ))}
    </p>
    <H4 my={5}>Sizes</H4>
    <p>
      <Badge ml="default" variant="primary" size="sm">small</Badge>
      <Badge ml="default" variant="primary">regular</Badge>
      <Badge ml="default" variant="primary" size="lg">large</Badge>
    </p>
  </Box>
)

export const Colors = () => {
  const blueColors = Object.keys(theme.colors).filter(color => color.match('blue'))
  const greyColors = Object.keys(theme.colors).filter(color => color.match(/grey/i))
  const restColors = Object.keys(theme.colors).filter(color => !color.match(/grey/i) && !color.match('blue'))

  return (
    <Box>
      <H3 my="xl">Blues</H3>
      <Box flex>
        {blueColors.map(name => (
          <Text m="default" textAlign="center">
            <Box display="inline-block" width="60px" height="60px" bg={theme.colors[name]} />
            <Text>{name}</Text>
          </Text>
        ))}
      </Box>
      <H3 my="xl">Greys</H3>
      <Box flex>
        {greyColors.map(name => (
          <Text m="default" textAlign="center">
            <Box display="inline-block" width="60px" height="60px" bg={theme.colors[name]} />
            <Text>{name}</Text>
          </Text>
        ))}
      </Box>
      <H3 my="xl">Rest</H3>
      <Box flex>
        {restColors.map(name => (
          <Text m="default" textAlign="center">
            <Box display="inline-block" width="60px" height="60px" bg={theme.colors[name]} />
            <Text>{name}</Text>
          </Text>
        ))}
      </Box>
    </Box>
  )
}

export const Spacings = () => {
  const spaces = Object.keys(theme.space)
  return (
    <Box>
      <H3 my="xl">Spacings</H3>
      <Box>
        {spaces.map(name => (
          <Box>
            <Text>
              {name}
              {' '}
              [
              {theme.space[name]}
              ]
            </Text>
            <Box mb="xxl" width="600px" height={theme.space[name]} bg="#C7D2FC" />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
