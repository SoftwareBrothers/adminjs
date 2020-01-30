/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Drawer, DrawerFooter, DrawerContent } from './drawer'
import { H3 } from '../atoms/header'
import { Button } from '../atoms/button'
import { Icon } from '../atoms/icon'
import { Box } from '../atoms/box'

import { FormGroupStory } from '../molecules/form-group.stories'

export const FullDrawer: React.FC = () => (
  <Drawer>
    <DrawerContent>
      <H3>
        <Button size="icon" rounded mr="lg">
          <Icon icon="ChevronRight" />
        </Button>
        Edit
      </H3>
      <Box my={7} p={0}>
        <Button size="sm">
          <Icon icon="Information" />
          Info
        </Button>
        <Button size="sm" ml="lg">
          <Icon icon="Delete" />
          Delete
        </Button>
      </Box>
      <FormGroupStory />
    </DrawerContent>
    <DrawerFooter>
      <Button variant="primary">
        Save
      </Button>
    </DrawerFooter>
  </Drawer>
)
