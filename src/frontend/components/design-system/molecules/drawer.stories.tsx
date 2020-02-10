/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Drawer } from './drawer/drawer'
import { DrawerContent } from './drawer/drawer-content'
import { DrawerFooter } from './drawer/drawer-footer'
import { H3 } from '../atoms/header'
import { Button } from '../atoms/button'
import { Icon } from '../atoms/icon'
import { Box } from '../atoms/box'

import { FormElements } from './form-group.stories'

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
      <FormElements />
    </DrawerContent>
    <DrawerFooter>
      <Button variant="primary">
        Save
      </Button>
    </DrawerFooter>
  </Drawer>
)
