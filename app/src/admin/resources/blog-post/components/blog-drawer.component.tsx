import React, { useState } from 'react'
import {
  Box,
  DrawerContent,
  H3,
  Button,
  Icon,
  DrawerFooter,
} from '@admin-bro/design-system'
import {
  ActionProps,
  BasePropertyComponent,
  DrawerPortal,
  useRecord,
} from 'admin-bro'
import BlogSectionButton from './blog-section-button.component'

const OPTIONS_WIDTH = '380px'

const REGULAR_PROPERTIES = [
  'postImage', 'postUrl', 'publishAt', 'tags', 'excerpt',
]

const SECTIONS = [
  'ogTags', 'twitter', 'facebook',
] as const

export type BlogDrawerProps = ActionProps & {
  toggle: () => void;
}

const BlogDrawer: React.FC<BlogDrawerProps> = (props) => {
  const { resource, record: initialRecord, toggle } = props

  const { record, handleChange, submit, loading } = useRecord(initialRecord, resource.id)
  const [section, setSection] = useState<typeof SECTIONS[number] | null>(null)

  return (
    <DrawerPortal width={OPTIONS_WIDTH}>
      <DrawerContent pb="0">
        <Box flex>
          {section && (
            <Box flexGrow={0}>
              <Button
                size="icon"
                rounded
                onClick={(): void => setSection(null)}
                variant="light"
                mr="lg"
              >
                <Icon icon="ChevronLeft" color="grey20" />
              </Button>
            </Box>
          )}
          <Box flexGrow={1}>
            <H3>{section || 'Post Settings'}</H3>
          </Box>
          {!section && (
            <Box flexGrow={0}>
              <Button size="icon" rounded onClick={toggle} variant="light">
                <Icon icon="Close" />
              </Button>
            </Box>
          )}
        </Box>
        {section ? (
          <BasePropertyComponent
            resource={resource}
            onChange={handleChange}
            record={record}
            where="edit"
            property={resource.properties[section]}
          />
        ) : (
          <Box>
            {REGULAR_PROPERTIES.map(propertyKey => (
              <BasePropertyComponent
                key={propertyKey}
                resource={resource}
                onChange={handleChange}
                record={record}
                where="edit"
                property={resource.properties[propertyKey]}
              />
            ))}
            {SECTIONS.map(sectionInList => (
              <BlogSectionButton
                section={sectionInList}
                onClick={(): void => setSection(sectionInList)}
              />
            ))}
          </Box>
        )}
      </DrawerContent>
      <DrawerFooter>
        <Button variant="primary" onClick={() => submit()}>
          {loading ? (<Icon icon="Fade" spin />) : null}
          Save
        </Button>
      </DrawerFooter>
    </DrawerPortal>
  )
}


export default BlogDrawer
