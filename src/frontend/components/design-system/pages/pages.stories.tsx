import React from 'react'
import { action } from '@storybook/addon-actions'

import { Box } from '../atoms/box'
import { NavigationTemplate, TopBar } from '../templates/template.stories'
import { TableStory } from '../organisms/table.stories'
import { H3 } from '../atoms/header'
import { Badge } from '../atoms/badge'
import { Pagination } from '../organisms/pagination'
import { Text } from '../atoms/text'
import { InfoBox } from '../molecules/info-box'
import { Button } from '../atoms/button'
import { Icon } from '../atoms/icon'

export default {
  title: 'Pages',
}

const ActionHeader = () => (
  <H3 mb="lg">
    Adding New Car
    <Badge variant="primary" size="sm" ml="lg">Draft</Badge>
  </H3>
)

export const ListWithSidebar = () => (
  <Box width="1200px" height="900px" flex>
    <NavigationTemplate
      width="300px"
      px="lg"
    />
    <Box flex flexDirection="column" flexGrow={1}>
      <TopBar />
      <Box flexGrow={1} variant="grey">
        <ActionHeader />
        <Box variant="white">
          <TableStory />
          <Box mt="xxl">
            <Text textAlign="center">
              <Pagination page={3} perPage={4} total={214} onChange={action('pagination')} />
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
)

export const EmptyList = () => (
  <Box width="1200px" height="900px" flex>
    <NavigationTemplate
      width="300px"
      px="lg"
    />
    <Box flex flexDirection="column" flexGrow={1}>
      <TopBar />
      <Box flexGrow={1} variant="grey">
        <ActionHeader />
        <InfoBox title="There are no cars yet">
          <Text>
            Currently we do not have any cars in the system.
            You can create first car by clicking create new car
          </Text>
          <Text mt="xl">
            <Button variant="primary">
              <Icon icon="Add" />
              Create First Car
            </Button>
          </Text>
        </InfoBox>
      </Box>
    </Box>
  </Box>
)
