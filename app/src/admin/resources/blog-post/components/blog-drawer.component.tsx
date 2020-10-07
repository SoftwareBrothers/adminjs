import React from 'react'
import {
  Box,
  DrawerContent,
  H3,
  Button,
  Icon,
  DrawerFooter,
} from '@admin-bro/design-system'
import {
  BasePropertyComponent,
  DrawerPortal,
  OnPropertyChange,
  RecordJSON,
  ResourceJSON,
} from 'admin-bro'

const OPTIONS_WIDTH = '380px'

export type BlogDrawerProps = {
  record: RecordJSON;
  resource: ResourceJSON;
  handleChange: OnPropertyChange;
  toggle: () => void;
}

const BlogDrawer: React.FC<BlogDrawerProps> = (props) => {
  const { record, resource, handleChange, toggle } = props

  const properties = [
    'postImage', 'postUrl', 'publishAt', 'tags', 'excerpt', 'ogTags', 'twitter', 'facebook',
  ]

  return (
    <DrawerPortal width={OPTIONS_WIDTH}>
      <DrawerContent>
        <Box flex>
          <Box flexGrow={1}>
            <H3>
              Post Settings
            </H3>
          </Box>
          <Box flexGrow={0}>
            <Button size="icon" rounded mr="lg" onClick={toggle}>
              <Icon icon="Close" />
            </Button>
          </Box>
        </Box>
        <Box>
          {properties.map(propertyKey => (
            <BasePropertyComponent
              key={propertyKey}
              resource={resource}
              onChange={handleChange}
              record={record}
              where="edit"
              property={resource.properties[propertyKey]}
            />
          ))}
        </Box>
      </DrawerContent>
      <DrawerFooter>
        <Button variant="primary">
          Save
        </Button>
      </DrawerFooter>
    </DrawerPortal>
  )
}


export default BlogDrawer
